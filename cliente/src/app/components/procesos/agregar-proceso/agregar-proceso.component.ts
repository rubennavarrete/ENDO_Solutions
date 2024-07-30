import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators,  AbstractControl, ValidationErrors } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
import { ProcesosService } from '../../../core/services/procesos.service';

@Component({
  selector: 'app-agregar-proceso',
  templateUrl: './agregar-proceso.component.html',
  styleUrls: ['./agregar-proceso.component.css']
})
export class AgregarProcesoComponent {

  loading = false;
  request = false;
  myForm!: FormGroup;

  private destroy$ = new Subject<any>();

  constructor(
    public srvProcesos: ProcesosService,
    public srvModal: ModalService,
    public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      str_proc_nombre: [null, Validators.required],
      str_proc_descripcion: [null, Validators.required],
      str_proc_estado: ['ACTIVO', Validators.required],
      num_proc_costo: [null, [Validators.required, this.moneyValidator]]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 400);
  }

  moneyValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined) {
      return { required: true };
    }
    if (isNaN(value)) {
      return { invalidNumber: true };
    }
    if (value <= 0) {
      return { invalidAmount: true };
    }
    // Verifica que tenga como máximo dos dígitos decimales
    const decimalRegex = /^\d+(\.\d{1,2})?$/;
    if (!decimalRegex.test(value)) {
      return { invalidDecimal: true };
    }
    return null;
  }

  agregarProceso() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de agregar un nuevo proceso',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Creando Proceso...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.srvProcesos.agregarProceso(this.myForm.value).subscribe({
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
            this.srvProcesos.obtenerProceso({
              order: [{ parameter: 'id_proc_proceso', direction: 'DESC' }],
            })
            this.myForm.reset();
            this.srvModal.closeModal();
          },
          error: (err) => {
            console.log('ERROR AL CREAR EL PROCESO', err);
            this.request = false;
            Swal.fire({
              title: 'ERROR: al crear el proceso',
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
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
