// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']); // Redirige al login si no hay token
      return false;
    }

    try {
      // Decodificar el token para extraer el rol
      const payload = JSON.parse(atob(token.split('.')[1]));
      // const userRole = payload.tipo; // Asegúrate de que `tipo` es el campo del rol en tu token

      // // Lógica de acceso por rol
      // const allowedRoutes: { [key: string]: string[] } = {
      //   Médico: ['/', '/pacientes', '/agenda', '/doctores', '/ubicacion', '/procesos', '/especialidad','/ajustes'],
      //   Administrador: ['/pacientes', '/agenda','/ajustes'],
      // };
      const userRole = payload.rol; // Asegúrate de que `tipo` es el campo del rol en tu token

      // Lógica de acceso por rol
      const allowedRoutes: { [key: string]: string[] } = {
        1: ['/', '/pacientes', '/agenda', '/doctores', '/ubicacion', '/procesos', '/especialidad','/ajustes','/notificaciones'],
        2: ['/pacientes', '/agenda','/ajustes'],
      };

      const currentPath = state.url;
      const isAllowed = allowedRoutes[userRole]?.includes(currentPath);

      if (!isAllowed) {
        this.router.navigate(['/unauthorized']); // Ruta de acceso denegado
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      this.router.navigate(['/login']); // Redirige al login si el token es inválido
      return false;
    }
  }
}
