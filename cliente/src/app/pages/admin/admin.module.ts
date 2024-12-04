import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pacientes',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pacientes/pacientes.module').then((m) => m.PacientesModule),
      },
      {
        path: 'doctores',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./doctores/doctores.module').then((m) => m.DoctoresModule),
      },
      {
        path: 'agenda',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./agenda/agenda.module').then((m) => m.AgendaModule),
      },
      {
        path: 'ubicacion',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./ubicacion/ubicacion.module').then((m) => m.UbicacionModule),
      },
      {
        path: 'procesos',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./procesos/procesos.module').then((m) => m.ProcesosModule),
      },
      {
        path: 'especialidad',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./especialidad/especialidad.module').then((m) => m.EspecialidadModule),
      },
      {
        path: 'notificaciones',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./notificaciones/notificaciones.module').then((m) => m.NotificacionesModule),
      },
      {
        path: 'ajustes',
        canActivate: [AuthGuard],

        loadChildren: () =>
          import('./ajustes/ajustes.module').then((m) => m.AjustesModule),
      }
    ],
  },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [AdminComponent],
})
export class AdminModule {}
