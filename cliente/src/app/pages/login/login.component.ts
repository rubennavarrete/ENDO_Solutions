import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dataLoginUser } from 'src/app/core/models/login';
import { LoginService } from 'src/app/core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup; // Formulario reactivo
  isLoading = false; // Estado de carga
  errorMessage: string | null = null; // Mensajes de error

  credentials: dataLoginUser = {
    correo: '',
    contrasena: '',
  };

  constructor(public fb: FormBuilder,
    private srvLogin: LoginService,
    private router: Router

  ) {
    // this.createForm();
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    this.isLoading = true;

    const { correo, contrasena } = this.loginForm.value;

    this.srvLogin.login({ correo, contrasena }).subscribe({
      next: (response) => {
        // Guardar el token en el almacenamiento local
        localStorage.setItem('token', response.token);

        // Redirigir al usuario a la página principal o al dashboard
        this.router.navigate(['/pacientes']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Error al iniciar sesión. Intente nuevamente.';
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
