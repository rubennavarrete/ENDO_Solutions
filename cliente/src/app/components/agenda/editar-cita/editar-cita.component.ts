import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
import { AgendaService } from 'src/app/core/services/agenda.service';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.component.html',
  styleUrls: ['./editar-cita.component.css']
})
export class EditarCitaComponent {

  myForm!: FormGroup;
  procesos: { id_proc_proceso: number; str_proc_nombre: string; }[] = [];
  ubicaciones: { id_ubi_ubicacion: number; str_ubi_nombre: string; }[] = [];
  pacientes: { id_pac_paciente: number; str_pac_nombre: string; str_pac_apellido: string; }[] = [];
  doctores: { id_per_persona: number; str_per_nombre: string; str_per_apellido: string; }[] = [];

  private destroy$ = new Subject<any>();
  refresh = new Subject<void>();

  constructor(
    public srvAgenda: AgendaService,
    public srvModal: ModalService,
    public fb: FormBuilder
  ) {

    this.myForm = this.fb.group({
      id_age_medico: [null, Validators.required],
      id_age_proceso: [null, Validators.required],
      id_age_ubicacion: [null, Validators.required],
      id_age_paciente: [null, Validators.required],
      dt_age_fecha: [null, Validators.required],
      tm_age_hora_inicio: [null, [Validators.required, this.timeRangeValidator]],
      tm_age_hora_fin: [null, Validators.required],
      str_age_color: ["#000000", Validators.required],
      str_age_estado: ["ACTIVO", Validators.required],
    }, { validators: this.endTimeAfterStartTimeValidator });
  }

  ngOnInit(): void {
    this.loadProcesos();
    this.loadUbicaciones();
    this.loadPacientes();
    this.loadDoctores();
  }

  loadProcesos(): void {
    this.srvAgenda.getProcesos().subscribe((data: any) => {
      this.procesos = data.body;
    });
  }

  loadUbicaciones(): void {
    
    this.srvAgenda.getUbicaciones().subscribe((data: any) => {
      this.ubicaciones = data.body;
    });
  }

  loadPacientes(): void {
    
    this.srvAgenda.getPacientes().subscribe((data: any) => {
      this.pacientes = data.body;
    });
  }

  loadDoctores(): void {
    this.srvAgenda.getDoctores().subscribe((data: any) => {
      this.doctores = data.body;
    });
  }

  timeRangeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const [hour, minute] = value.split(':').map(Number);

    if (hour < 7 || hour > 19 || (hour === 19 && minute > 0)) {
      return { outOfRange: true };
    }
    return null;
  }

  endTimeAfterStartTimeValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const startControl = group.get('tm_age_hora_inicio');
    const endControl = group.get('tm_age_hora_fin');

    if (!startControl || !endControl) return null;

    const start = startControl.value;
    const end = endControl.value;

    if (!start || !end) return null;

    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
      return { endTimeBeforeStartTime: true };
    }

    return null;
  }

  EditarCita(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de EDITAR esta cita médica',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Editando cita...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        console.log('FORM', this.myForm.value);
        // this.request = true;
        this.srvAgenda.editarAgenda(this.myForm.value).subscribe({
          next: (resp: any) => {
            if (resp.status) {
              // this.idHC = resp.body.id_con_consulta;
              Swal.close();
              Swal.fire({
                icon: 'success',
                title: resp.message,
                showDenyButton: false,
                confirmButtonText: 'Aceptar',
              });
            } else {
              Swal.close();
              Swal.fire({
                icon: 'error',
                title: resp.message,
                text: 'Algo salió mal',
              });
              // this.request = false;
            }

            this.myForm.reset();
            this.srvModal.closeModal();

          },
          error: (err) => {
            console.log('ERROR AL EDITAR LA CITA', err);
            // this.request = false;
            Swal.fire({
              title: 'ERROR: al editar la cita',
              text: 'Por favor comuníquese con el servicio técnico',
              icon: 'error',
              footer:
                err.error.message +
                '\n' +
                (err.error.errores ? JSON.stringify(err.error.errores) : ''),
              showDenyButton: false,
              confirmButtonText: 'Aceptar',
            });
          },
          complete: () => {
            // this.srvModal.setId(-1);
            //cambiar el titulo del modal
            // this.request = false;
            document.location.reload();

          },
        });
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se guardaron', '', 'info');
//recargar la pagina

      }
    });
    
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
