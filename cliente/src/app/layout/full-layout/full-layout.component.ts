import { Component } from '@angular/core';

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
    ],
  };
}
