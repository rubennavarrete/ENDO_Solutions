import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { HistorialConsultaService } from 'src/app/core/services/historial-consulta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-hc',
  templateUrl: './editar-hc.component.html',
  styleUrls: ['./editar-hc.component.css']
})
export class EditarHCComponent implements OnInit, OnDestroy{
  loading = false;
  request = false;
  myForm!: FormGroup;
  today: string = new Date().toISOString().split('T')[0];
  idPaciente: number = -1;
  idHC: number = -1;
  nombrePaciente: string = '';
  doctores: {id_per_persona:number; str_per_nombre:string; str_per_apellido:string;} [] = [];
  private destroy$ = new Subject<any>();

  constructor(
    public srvHistorialConsulta: HistorialConsultaService,
    public srvModal: ModalService,
    public fb: FormBuilder
  ){
    srvModal.selectId$.pipe().subscribe((id) => {
      this.idPaciente = id;
      console.log('ID idPaciente', this.idPaciente);
    });
    this.srvModal.selectNombrePaciente$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.nombrePaciente = data;
      });

      this.srvHistorialConsulta.getMedicos().subscribe((data: any) => {
        this.doctores = data.body;
        console.log('DOCTORES', this.doctores);
      }
      );

      this.myForm = this.fb.group({
        id_con_medico: [null, Validators.required],
        id_con_paciente: [this.idPaciente, Validators.required],
        str_con_motivo: [null, Validators.required],
        str_con_exam_general: ['Ninguno', Validators.required],
        str_con_exam_especifico: ['Ninguno', Validators.required],
        str_con_diagnostico: ['Ninguno', Validators.required],
        str_con_tratamiento: ['Ninguno', Validators.required],
        str_con_recomendaciones: ['Ninguno', Validators.required],
        str_con_observaciones: ['Ninguno', Validators.required],
        dt_con_fecha: [this.today, [Validators.required, this.futureDateValidator]],
        tm_con_hora_inicio: ['', [Validators.required, this.timeRangeValidator]],
        tm_con_hora_fin: ['', [Validators.required]],
        str_con_estado: ["ACTIVO", Validators.required]
      }, { validators: this.endTimeAfterStartTimeValidator });
  }

  ngOnInit(): void {
    console.log('Entro a agregar HC');
    setTimeout(() => {
      this.loading = false;
    }, 400);

    this.srvHistorialConsulta.selectedUpdateHistorialConsulta$
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.myForm.patchValue(data);
      this.idHC = data.id_con_consulta;
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
    const startControl = group.get('tm_con_hora_inicio');
    const endControl = group.get('tm_con_hora_fin');

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

  // Validador personalizado para fechas futuras
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const currentDate = new Date();
    if (inputDate > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  editarHC(){
    Swal.fire({
      title: 'Está seguro que desea modificar el historial de consulta?',
      showDenyButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Modificando Información...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.srvHistorialConsulta
          .putHistorialConsulta(this.idHC, this.myForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp: any) => {
              if (resp.status) {
                console.log('resp ->', resp);
                this.idHC = resp.body.id_con_consulta;
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Historial de Consulta Modificada Correctamente',
                  showDenyButton: false,
                  confirmButtonText: 'Aceptar',
                });
                // this.srvModal.setNombrePaciente(resp.body.str_pac_nombre + ' ' + resp.body.str_pac_apellido);

              } else {
                Swal.close();
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: resp.message,
                  showDenyButton: false,
                  confirmButtonText: 'Aceptar',
                });
              }

              this.srvHistorialConsulta.getHConsulta({
                id_con_paciente: this.idPaciente,
                order: [{ parameter: 'id_con_consulta', direction: 'DESC' }],
              });

              this.myForm.reset();
              this.srvModal.closeModal();
            },
            error: (err: any) => {
              Swal.close();
              console.log('Error al actualizar el historial de consulta', err);
              this.request = false;
              Swal.fire({
                title: 'Error al actualizar el historial de consulta',
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
              this.srvModal.closeModal();
              // this.srvModal.setId(-1);
              this.myForm.reset();
              // this.ngOnInit
              this.request = false;

            },
          });
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
