import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators,  AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
import { EspecialidadService } from '../../../core/services/especialidad.service';

@Component({
  selector: 'app-agregar-espe',
  templateUrl: './agregar-espe.component.html',
  styleUrls: ['./agregar-espe.component.css']
})
export class AgregarEspeComponent {

  loading = false;
  request = false;
  myForm!: FormGroup;

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
  }

  agregarEspecialidad() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de agregar una nueva especialidad',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Creando Especialidad...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.srvEspecialidad.agregarEspecialidad(this.myForm.value).subscribe({
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
            this.srvEspecialidad.obtenerEspecialidad({
              order: [{ parameter: 'id_esp_especialidad', order: 'DESC' }],
            })
            this.myForm.reset();
            this.srvModal.closeModal();
          },
          error: (err) => {
            console.log('ERROR AL CREAR LA ESPECIALIDAD', err);
            this.request = false;
            Swal.fire({
              title: 'ERROR: al crear la especialidad',
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

}
