import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { LoginService } from 'src/app/core/services/login.service';
import { DataTypeUsuarios, nuevoUsuario, UsuarioModel } from 'src/app/core/models/usuarios';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators,  AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent  implements OnInit{

  private destroy$ = new Subject<void>();
  myForm!: FormGroup;
  showPassword: boolean = false;
  id: number =0;
  constructor(
    private fb: FormBuilder,
    private srvLogin: LoginService,
    private srvUsuarios: UsuariosService
  ) {
    // Inicializa el formulario con campos vacíos
    this.myForm = this.fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      cedula: ['', Validators.required],
      email: [null, Validators.required],
      contrasenia: [null, Validators.required],
      telefono: [null, Validators.required],
      direccion: [null, Validators.required],
      estado:[null, Validators.required],
      tipo: [null, Validators.required],
      rol:[null, Validators.required]

    });
  }

  ngOnInit(): void {
    // Obtén el usuario actual
    const user = this.srvLogin.getCurrentUser();
    if (user && user.id) {
      this.id=user.id
      console.log("ide ",this.id)
      this.cargarUsuario(user.id);
    } else {
      console.warn('No se pudo obtener el ID del usuario actual.');
    }

    // Suscríbete al observable para llenar el formulario
    this.srvUsuarios.selectedUpdateUsuario$
      .pipe(takeUntil(this.destroy$))
      .subscribe((usuario) => {
        console.log('Usuario:', usuario);
        this.myForm.patchValue({
          nombre: usuario.str_per_nombre,
          apellido: usuario.str_per_apellido,
          cedula: usuario.str_per_cedula,
          email: usuario.str_per_correo,
          contrasenia: usuario.str_per_contrasenia,
          telefono: usuario.str_per_telefono,
          direccion: usuario.str_per_direccion,
          estado: usuario.str_per_estado,
          tipo: usuario.str_per_tipo,
          rol: usuario.int_per_rol
          // especialidadId: usuario.id_esp_especialidad,
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

  cargarUsuario(id: number): void {
    this.srvUsuarios
      .getUsuario(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: UsuarioModel) => {
        console.log('Datos del usuario:', data);
        this.srvUsuarios.setUpdateUsuario(data.body); // Emite el usuario para `selectedUpdateUsuario$`
      });
  }

  editarUsuario(): void {
    Swal.fire({
      title: '¿Está seguro que desea modificar al usuario?',
      showDenyButton: true,
      confirmButtonText: 'Modificar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Modificando Información...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
  
        // this.request = true; // Si tienes alguna lógica de estado, puedes configurarla aquí.
  
        this.srvUsuarios.putUsuario(this.id, this.myForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp: any) => {
              if (resp.status) {
                console.log('Respuesta:', resp);
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Usuario Modificado Correctamente',
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
              this.cargarUsuario(this.id);

              // Refrescar los usuarios si es necesario
              // this.srvUsuarios.obtenerUsuarios({
              //   order: [{ parameter: 'id_per_persona', direction: 'DESC' }],
              // });
  
              // Resetear formulario
              this.myForm.reset();
            },
            error: (err: any) => {
              Swal.close();
              console.log('Error al actualizar el usuario', err);
              // this.request = false;
  
              Swal.fire({
                title: 'Error al actualizar el usuario',
                text: 'Por favor, comuníquese con el servicio técnico',
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
              // Cerrar modal o realizar alguna acción final si es necesario
              // this.srvModal.closeModal();
              // this.request = false;
            },
          });
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se han guardado', '', 'info');
      }
    });
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
