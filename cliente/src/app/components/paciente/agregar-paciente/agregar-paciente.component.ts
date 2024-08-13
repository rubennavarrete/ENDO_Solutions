import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { PacientesService } from 'src/app/core/services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html',
  styleUrls: ['./agregar-paciente.component.css'],
})
export class AgregarPacienteComponent implements OnInit, OnDestroy {
  loading = false;
  request = false;
  myForm!: FormGroup;
  today: string = new Date().toISOString().split('T')[0];

  private destroy$ = new Subject<any>();

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
    console.log('Entro a agregar paciente');
    setTimeout(() => {
      this.loading = false;
    }, 400);
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

  agregarPaciente() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de agregar un nuevo paciente',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.time('agregarPaciente');
        Swal.fire({
          title: 'Creando Paciente...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.srvPacientes.agregarPaciente(this.myForm.value).subscribe({
          next: (resp: any) => {
            if (resp.status) {
              // console.log('Id del paciente recien creado', resp.body.id_pac_paciente);
              this.srvModal.setId(resp.body.id_pac_paciente);
              this.srvModal.setNombrePaciente(resp.body.str_pac_nombre + ' ' + resp.body.str_pac_apellido);
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

            this.srvPacientes.obtenerPaciente({
              order: [{ parameter: 'id_pac_paciente', direction: 'DESC' }],
            });
            // this.myForm.reset();
            // this.srvModal.closeModal();

          },
          error: (err) => {
            console.log('ERROR AL CREAR EL PACIENTE', err);
            this.request = false;
            Swal.fire({
              title: 'ERROR: al crear el paciente',
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
            console.timeEnd('agregarPaciente');
          },
        });
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se guardaron', '', 'info');

      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
