import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
import { DoctoresService } from '../../../core/services/doctores.service';

@Component({
  selector: 'app-editar-doctor',
  templateUrl: './editar-doctor.component.html',
  styleUrls: ['./editar-doctor.component.css']
})
export class EditarDoctorComponent {

  loading = false;
  request = false;
  myForm!: FormGroup;
  especialidades: { id_esp_especialidad: number; str_esp_nombre: string; }[] = [];
  showPassword: boolean = false;
  idDoctor: number = -1;

  private destroy$ = new Subject<any>();

  constructor(

    public srvDoctores: DoctoresService,
    public srvModal: ModalService,
    public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      cedula: ['', [Validators.required, this.tenDigitsValidator()]],
      email: [null, Validators.required],
      contrasenia: [null, Validators.required],
      telefono: [null, [Validators.required, this.tenDigitsValidator()]],
      direccion: [null, Validators.required],
      tipo: ["Médico", Validators.required],
      especialidadId: [null, Validators.required],
      // rol: [2, Validators.required]

    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 400);

    this.srvDoctores.getEspecialidades().subscribe((data: any) => {
      this.especialidades = data.body;
      console.log('ESPECIALIDADES', data);
    });

    this.srvModal.selectId$.pipe().subscribe((id) => {
      this.idDoctor = id;
    });

    this.srvDoctores.selectedUpdateDoctor$
    .pipe(takeUntil(this.destroy$))
    .subscribe((doctor) => {
      console.log('doctor', doctor);
      this.myForm.patchValue({
        nombre: doctor.str_per_nombre,
        apellido: doctor.str_per_apellido,
        cedula: doctor.str_per_cedula,
        email: doctor.str_per_correo,
        contrasenia: doctor.str_per_contrasenia,
        telefono: doctor.str_per_telefono,
        direccion: doctor.str_per_direccion,
        tipo: doctor.str_per_tipo,
        especialidadId: doctor.id_esp_especialidad,
      });
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  tenDigitsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^\d{10}$/.test(control.value);
      return valid ? null : { tenDigits: true };
    };
  }

  editarDoctor() {
    Swal.fire({
      title: 'Está seguro que desea modificar al doctor?',
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
        this.srvDoctores
          .putDoctor(this.idDoctor, this.myForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp: any) => {
              if (resp.status) {
                console.log('resp ->', resp);
                // this.idDoctor = resp.body.id_con_consulta;
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Doctor Modificado Correctamente',
                  showDenyButton: false,
                  confirmButtonText: 'Aceptar',
                });
                // this.srvModal.setNombrePaciente(resp.body.str_pac_nombre + ' ' + resp.body.str_pac_apellido);

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

              this.srvDoctores.obtenerDoctor({
                order: [{ parameter: 'id_per_persona', direction: 'DESC' }],
              });

              this.myForm.reset();
              this.srvModal.closeModal();
            },
            error: (err: any) => {
              Swal.close();
              console.log('Error al actualizar al doctor', err);
              this.request = false;
              Swal.fire({
                title: 'Error al actualizar al doctor',
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
              // this.srvModal.setId(-1);
              this.myForm.reset();
              // this.ngOnInit
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
