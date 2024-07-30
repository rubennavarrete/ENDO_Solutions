import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  AbstractControl, ValidationErrors } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { PacientesService } from 'src/app/core/services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css'],
})
export class EditarPacienteComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;

  loading = false;
  request = false;
  today: string = new Date().toISOString().split('T')[0];


  private destroy$ = new Subject<any>();

  idPaciente: any;

  constructor(
    public srvPacientes: PacientesService,
    public srvModal: ModalService,
    public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      str_pac_nombre: [null, Validators.required],
      str_pac_apellido: [null, Validators.required],
      str_pac_cedula: [null, Validators.required],
      str_pac_correo: [null, Validators.required],
      str_pac_sexo: [null, Validators.required],
      str_pac_telefono: [null, Validators.required],
      str_pac_nombre_familia: [null, Validators.required],
      str_pac_telefono_familia: [null, Validators.required],
      str_pac_relacion_familia: [null, Validators.required],
      dt_pac_fecha_nacimiento: ['', [Validators.required, this.futureDateValidator]],
      str_pac_direccion: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 400);

    this.srvPacientes.selectedUpdatePaciente$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.myForm.patchValue(data);
        this.idPaciente = data.id_pac_paciente;
        this.srvModal.setNombrePaciente(data.str_pac_nombre + ' ' + data.str_pac_apellido);
      });
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

  actualizarPaciente() {
    Swal.fire({
      title: 'Está seguro que desea modificar la Información del Paciente?',
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
        this.srvPacientes
          .putPaciente(this.idPaciente, this.myForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp: any) => {
              if (resp.status) {
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Información del Paciente Modificada Correctamente',
                  showDenyButton: false,
                  confirmButtonText: 'Aceptar',
                });
                this.srvModal.setNombrePaciente(resp.body.str_pac_nombre + ' ' + resp.body.str_pac_apellido);

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

              this.srvPacientes.obtenerPaciente({
                order: [{ parameter: 'id_pac_paciente', direction: 'DESC' }],
              });
              // this.myForm.reset();
              // this.srvModal.closeModal();
            },
            error: (err: any) => {
              Swal.close();
              console.log('Error al actualizar el Paciente', err);
              this.request = false;
              Swal.fire({
                title: 'Error al actualizar el Paciente',
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
              // this.srvModal.closeModal();
              // this.myForm.reset();
              this.ngOnInit
              this.request = false;

            },
          });
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
