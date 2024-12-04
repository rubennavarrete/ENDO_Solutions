import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
import { OdontogramaService } from 'src/app/core/services/odontograma.service';

@Component({
  selector: 'app-agregar-odonto',
  templateUrl: './agregar-odonto.component.html',
  styleUrls: ['./agregar-odonto.component.css']
})
export class AgregarOdontoComponent {
  loading = false;
  request = false;
  myForm!: FormGroup;
  today: string = new Date().toISOString().split('T')[0];
  idPaciente: number = -1;
  idOdontograma: number = -1;
  private destroy$ = new Subject<any>();

  constructor(
    public srvOdontograma: OdontogramaService,
    public srvModal: ModalService,
    public fb: FormBuilder
  ) {
    srvModal.selectId$.pipe().subscribe((id) => {
      this.idPaciente = id;
      console.log('ID idPaciente', this.idPaciente);
    });

      this.myForm = this.fb.group({
        id_odo_paciente: [this.idPaciente, Validators.required],
        int_odo_diente: [36, Validators.required],
        str_odo_cara: [null, Validators.required],
        str_odo_diagnostico: ['Ninguno', Validators.required],
        dt_odo_fecha_registro: [this.today, [Validators.required, this.futureDateValidator]],
      });
  }

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
      text: 'Estás a punto de agregar un odontograma',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Creando Historial de consulta...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        console.log('FORM', this.myForm.value);
        this.request = true;
        this.srvOdontograma.createOdontograma(this.myForm.value).subscribe({
          next: (resp: any) => {
            if (resp.status) {
              this.idOdontograma = resp.body.id_odo_odontograma;
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

            this.srvOdontograma.getlistOdontograma({
              id_odo_paciente: this.idPaciente,
              order: [{ parameter: 'id_odo_odontograma', direction: 'DESC' }],
            });

            this.myForm.reset();
            this.srvModal.closeModal();

          },
          error: (err) => {
            console.log('ERROR AL CREAR ODONTOGRAMA', err);
            this.request = false;
            Swal.fire({
              title: 'ERROR: al crear el odontograma',
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
