import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';
@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css'],
})
export class FullLayoutComponent {
  rolActive: any = {
    representarMenu: [
      {
        path: '/pacientes',
        name: 'Pacientes',
        icon: 'streetview',
        // children: [
        //   { path: '/tipo_responsable', name: 'Pago Planillas' },
        //   { path: '/proyecto_responsable', name: 'Generar Planillas' },
        // ],
      },
      {
        path: '/agenda',
        name: 'Agenda',
        icon: 'event_note',
        // children: [
        //   {
        //     path: '/datos_proyecto/datos_proyecto',
        //     name: 'Datos del Proyecto',
        //   },
        //   {
        //     path: '/datos_proyecto/contactos_responsables',
        //     name: 'Responsables',
        //   },
        //   {
        //     path: '/datos_proyecto/entrega_provisional',
        //     name: 'Entrega Provisional',
        //   },
        //   {
        //     path: '/datos_proyecto/entrega_definitiva',
        //     name: 'Entrega Definitiva',
        //   },
        //   {
        //     path: '/datos_proyecto/tipo_responsable',
        //     name: 'Tipo de Responsable',
        //   },
        //   {
        //     path: '/datos_proyecto/proyecto_responsable',
        //     name: 'Contactos de Responsables',
        //   },
        //   {
        //     path: '/datos_proyecto/direccion_gestion',
        //     name: 'Dirección de Gestión',
        //   },
        //   { path: '/datos_proyecto/sector', name: 'Sector' },
        //   { path: '/datos_proyecto/parroquia', name: 'Parroquia' },
        //   {
        //     path: '/datos_proyecto/clasificacion_proyecto',
        //     name: 'Clasificación del Proyecto',
        //   },
        // ],
      },
      {
        path: '/doctores',
        name: 'Doctores',
        icon: 'business_center',
        // children: [
        //   {
        //     path: '/compras_publicas/compras_publicas',
        //     name: 'Proceso Precontractual',
        //   },
        //   { path: '/compras_publicas/subida_portal', name: 'Subida al Portal' },
        //   {
        //     path: '/compras_publicas/estado_contratacion',
        //     name: 'Estado de la Contratación',
        //   },
        //   {
        //     path: '/compras_publicas/tipo_contratacion',
        //     name: 'Tipo de Contratación',
        //   },
        //   { path: '/compras_publicas/tipo_obra', name: 'Tipo de Obra' },
        // ],
      },
      {
        path: '/ubicacion',
        name: 'Ubicación',
        icon: 'location_on',
      },
      {
        path: '/procesos',
        name: 'Procesos',
        icon: 'work',
      },
      {
        path: '/especialidad',
        name: 'Especialidades',
        icon: 'local_hospital',
      },
      {
        path: '/notificaciones',
        name: 'Notificaciones',
        icon: 'notifications_active',
      }


    ],
  };

  menuFiltrado: any[] = [];
  userRole: number = 0; // Rol del usuario (1: Admin, 2: Médico, etc.)

  constructor(private authService: LoginService) {
  }

  ngOnInit(): void {
    // Obtén el rol desde el token o servicio
    const user = this.authService.getCurrentUser();
    this.userRole = user?.rol || 0; // Ajusta según la lógica de roles
    // Filtra las rutas según el rol
    this.menuFiltrado = this.filtrarMenuPorRol();
  }

  filtrarMenuPorRol(): any[] {
    if (this.userRole === 1) {
      // Rol 1: acceso a todas las rutas
      return this.rolActive.representarMenu;
    } else if (this.userRole === 2) {
      // Rol 2: acceso limitado
      return this.rolActive.representarMenu.filter(
        (item: any) => item.path === '/pacientes' || item.path === '/agenda'
      );
    }
    return [];
  }
}
