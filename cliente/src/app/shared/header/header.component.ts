import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import config from 'config/config';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  baseUrl: string = config.URL_BASE_PATH;

  userData: any = '';
  @Input() rolActive: any = {};
  roles: any = {};

  private destroy$ = new Subject<any>();

  constructor(
    private srvLogin: LoginService,
    private router: Router

  ) {
  }
  ngOnInit(): void {
    const user = this.srvLogin.getCurrentUser();
    if (user && user.correo) {
      this.userData = user.correo; // Asignar el correo a userData
    }
    // boton de correo
    // this.roles = configRoles;

    const btnCorr = document.getElementById('btn-correo') as HTMLElement;
    const arrCorr = document.getElementById('arrowCorreo') as HTMLElement;

    const btnRoles = document.getElementById(
      'dropdownMenuButtonRoles'
    ) as HTMLElement;
    const arrCre = document.getElementById('arrow-created') as HTMLElement;

    btnCorr.addEventListener('click', (e) => {
      e.preventDefault();
      if (arrCorr.style.transform === 'rotate(0deg)') {
        arrCorr.style.transform = 'rotate(-90deg)';
      } else {
        arrCorr.style.transform = 'rotate(0deg)';
      }
    });

    // btnRoles.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   if (arrCre.style.transform === 'rotate(0deg)') {
    //     arrCre.style.transform = 'rotate(-90deg)';
    //   } else {
    //     arrCre.style.transform = 'rotate(0deg)';
    //   }
    // });
  }

  // this.userData = this.casclient.getLogin();

  clickMobileMenu() {
    const sidebar = document.getElementById('sidebar__main_component');
    if (sidebar) {
      sidebar.classList.toggle('close');
    }
  }

  clickMobileMenuProfile() {
    // .bottom_menu__mobile__complete_screen
    const bottomMenu = document.querySelector(
      '.bottom_menu__mobile__complete_screen'
    );

    if (bottomMenu) {
      bottomMenu.classList.toggle('open');
    }
  }

  // Cerrar sesión
  cerrarSeccion() {
    this.srvLogin.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  cambiarRol(idRol: number) {
    // const perfil = this.rolActive.listaRoles[idRol] as any;
    // this.header
    //   .postChangeRoles(perfil.id_perfil)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (res) => {
    //       let redireccion = this.baseUrl;
    //       switch (perfil.rol) {
    //         case 'TESORERO':
    //           redireccion = redireccion + '/polizas/vigentes';
    //           break;
    //         default:
    //           break;
    //       }
    //       localStorage.setItem('timeCache', String(0));
    //       window.location.href = redireccion;
    //     },
    //     error: (err) => {
    //       console.log('error =>', err);
    //     },
    //   });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
