import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
import { UbicacionService } from '../../../core/services/ubicacion.service';

@Component({
  selector: 'app-editar-ubicacion',
  templateUrl: './editar-ubicacion.component.html',
  styleUrls: ['./editar-ubicacion.component.css']
})
export class EditarUbicacionComponent {

  loading = false;
  request = false;
  myForm!: FormGroup;
  idUbicacion: number = -1;

  private destroy$ = new Subject<any>();

  constructor(
    public srvUbicacion: UbicacionService,
    public srvModal: ModalService,
    public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      str_ubi_nombre: [null, Validators.required],
      str_ubi_descripcion: [null, Validators.required],
      str_ubi_estado: ['ACTIVO', Validators.required],
    });


  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 400);

    this.srvUbicacion.selectedUpdateUbicacion$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.myForm.patchValue(data);
        this.idUbicacion = data.id_ubi_ubicacion;
      });
  }

  editarUbicacion() {
    Swal.fire({
      title: 'Está seguro que desea modificar la ubicación?',
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
        this.srvUbicacion
        .putUbicacion(this.idUbicacion, this.myForm.value)
          .pipe(takeUntil(this.destroy$))
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
                  icon: 'error',
                  title: 'Error',
                  text: resp.message,
                  showDenyButton: false,
                  confirmButtonText: 'Aceptar',
                });
              }

              this.srvUbicacion.obternerUbicaciones({
                order: [{ parameter: 'id_ubi_ubicacion', direction: 'DESC' }],
              });

              this.myForm.reset();
              this.srvModal.closeModal();
            },
            error: (err: any) => {
              Swal.close();
              console.log('Error al actualizar la ubicación', err);
              this.request = false;
              Swal.fire({
                title: 'Error al actualizar la ubicación',
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
