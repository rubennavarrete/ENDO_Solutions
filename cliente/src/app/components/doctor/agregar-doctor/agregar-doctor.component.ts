import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
import { DoctoresService } from '../../../core/services/doctores.service';

@Component({
  selector: 'app-agregar-doctor',
  templateUrl: './agregar-doctor.component.html',
  styleUrls: ['./agregar-doctor.component.css']
})
export class AgregarDoctorComponent {
  loading = false;
  request = false;
  myForm!: FormGroup;

  private destroy$ = new Subject<any>();

  constructor(

    public srvDoctores: DoctoresService,
    public srvModal: ModalService,
    public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      cedula: [null, Validators.required],
      email: [null, Validators.required],
      contrasenia: [null, Validators.required],
      telefono: [null, Validators.required],
      direccion: [null, Validators.required],
      estado: [null, Validators.required],
      tipo: [null, Validators.required],
      especialidadId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 400);
  }

  agregarPaciente() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de agregar un nuevo doctor',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Creando Paciente...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.srvDoctores.agregarDoctor(this.myForm.value).subscribe({
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

            this.srvDoctores.obtenerDoctor({
              order: [{ parameter: 'id_per_persona', direction: 'DESC' }],
            });
            this.myForm.reset();
            this.srvModal.closeModal();
          },
          error: (err) => {
            console.log('ERROR AL CREAR EL DOCTOR', err);
            this.request = false;
            Swal.fire({
              title: 'ERROR: al crear el doctor',
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
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
