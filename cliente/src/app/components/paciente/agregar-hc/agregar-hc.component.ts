import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { HistorialConsultaService } from 'src/app/core/services/historial-consulta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-hc',
  templateUrl: './agregar-hc.component.html',
  styleUrls: ['./agregar-hc.component.css']
})
export class AgregarHCComponent implements OnInit, OnDestroy{

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
  ) {
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

  agregarHC() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de agregar una nueva historia de consulta',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.time('agregarHistorialConsulta');
        Swal.fire({
          title: 'Creando Historial de consulta...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        console.log('FORM', this.myForm.value);
        this.request = true;
        this.srvHistorialConsulta.createHistorialConsulta(this.myForm.value).subscribe({
          next: (resp: any) => {
            if (resp.status) {
              this.idHC = resp.body.id_con_consulta;
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
              this.request = false;
            }

            // this.srvHistorialConsulta.getByIdHistorialConsulta(this.idHC)
            // .pipe(takeUntil(this.destroy$))
            // .subscribe((resp: any) => {
            //   this.myForm.patchValue(resp.data);
            //   console.log('RESPUESTA', resp);
            // });
            this.srvHistorialConsulta.getHConsulta({
              id_con_paciente: this.idPaciente,
              order: [{ parameter: 'id_con_consulta', direction: 'DESC' }],
            });

            this.myForm.reset();
            this.srvModal.closeModal();

          },
          error: (err) => {
            console.log('ERROR AL CREAR LA HISTORIA DE CONSULTA', err);
            this.request = false;
            Swal.fire({
              title: 'ERROR: al crear la historia de consulta',
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
            this.request = false;
            console.timeEnd('agregarHistorialConsulta');
          },
        });
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se guardaron', '', 'info');

      }
    });
    }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
