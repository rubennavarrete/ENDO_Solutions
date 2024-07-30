import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
import { ProcesosService } from '../../../core/services/procesos.service';

@Component({
  selector: 'app-editar-proceso',
  templateUrl: './editar-proceso.component.html',
  styleUrls: ['./editar-proceso.component.css']
})
export class EditarProcesoComponent {

  loading = false;
  request = false;
  myForm!: FormGroup;
  iProceso: number = -1;

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

    this.srvProcesos.selectedUpdateProceso$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.myForm.patchValue(data);
        this.iProceso = data.id_proc_proceso;
      });
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

  editarProceso() {
    Swal.fire({
      title: 'Está seguro que desea modificar el proceso?',
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
        this.srvProcesos
          .putProceso(this.iProceso, this.myForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
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
              title: 'Error',
              text: resp.message,
              showDenyButton: false,
              confirmButtonText: 'Aceptar',
            });
          }
          this.srvProcesos.obtenerProceso({
            order: [{ parameter: 'id_proc_proceso', direction: 'DESC' }],
          });
          this.myForm.reset();
            this.srvModal.closeModal();
        },
        error: (err: any) => {
          Swal.close();
          console.log('Error al actualizar el proceso', err);
          this.request = false;
          Swal.fire({
            title: 'Error al actualizar el proceso',
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
      }else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
