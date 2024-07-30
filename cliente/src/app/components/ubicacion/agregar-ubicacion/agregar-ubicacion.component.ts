import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators,  AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
import { UbicacionService } from '../../../core/services/ubicacion.service';

@Component({
  selector: 'app-agregar-ubicacion',
  templateUrl: './agregar-ubicacion.component.html',
  styleUrls: ['./agregar-ubicacion.component.css']
})
export class AgregarUbicacionComponent {

  loading = false;
  request = false;
  myForm!: FormGroup;

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
  }

  agregarUbicacion() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de agregar una nueva ubicación',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Creando Ubicación...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.srvUbicacion.agregarUbicacion(this.myForm.value).subscribe({
          next: (resp: any) => {
            if (resp.status) {
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

            this.srvUbicacion.obternerUbicaciones({
              order: [{ parameter: 'id_ubi_ubicacion', direction: 'DESC' }],
            });
            this.myForm.reset();
            this.srvModal.closeModal();
          },
          error: (err) => {
            console.log('ERROR AL CREAR LA UBICACIÓN', err);
            this.request = false;
            Swal.fire({
              title: 'ERROR: al crear la ubicación',
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
            this.request = false;
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
