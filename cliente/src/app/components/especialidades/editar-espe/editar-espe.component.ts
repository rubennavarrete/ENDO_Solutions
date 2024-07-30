import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
import { EspecialidadService } from '../../../core/services/especialidad.service';

@Component({
  selector: 'app-editar-espe',
  templateUrl: './editar-espe.component.html',
  styleUrls: ['./editar-espe.component.css']
})
export class EditarEspeComponent {

  loading = false;
  request = false;
  myForm!: FormGroup;
  idEspe: number = -1;

  private destroy$ = new Subject<any>();

  constructor(
    public srvEspecialidad: EspecialidadService,
    public srvModal: ModalService,
    public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      str_esp_nombre: [null, Validators.required],
      str_esp_descripcion: [null, Validators.required],
      str_esp_estado: ['ACTIVO', Validators.required],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 400);

    this.srvEspecialidad.selectedUpdateEspecialidad$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.myForm.patchValue(data);
        this.idEspe = data.id_esp_especialidad;
      });
  }

  editarEspecialidad() {
    Swal.fire({
      title: 'Está seguro que desea modificar la especialidad?',
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
        this.srvEspecialidad.putEspecialidad(this.idEspe, this.myForm.value)
          .subscribe({
            next: (resp: any) => {
              if (resp.status) {
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Ubicación Modificada Correctamente',
                  showDenyButton: false,
                  confirmButtonText: 'Aceptar',
                });
              } else {
                Swal.close();
                Swal.fire({
                  title: 'Error al modificar la especialidad',
                  text: resp.message,
                  icon: 'error',
                  confirmButtonText: 'Ok',
                });
              }
              this.srvEspecialidad.obtenerEspecialidad({
                order: [{ parameter: 'id_esp_especialidad', order: 'DESC' }],
              })

              this.myForm.reset();
              this.srvModal.closeModal();
            },
            error: (err: any) => {
              Swal.close();
              console.log('Error al actualizar la especialización', err);
              this.request = false;
              Swal.fire({
                title: 'Error al actualizar la especialización',
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
              this.myForm.reset();
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
