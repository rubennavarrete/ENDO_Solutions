import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pacientes',
        loadChildren: () =>
          import('./pacientes/pacientes.module').then((m) => m.PacientesModule),
      },
      {
        path: 'doctores',
        loadChildren: () =>
          import('./doctores/doctores.module').then((m) => m.DoctoresModule),
      },
      {
        path: 'agenda',
        loadChildren: () =>
          import('./agenda/agenda.module').then((m) => m.AgendaModule),
      },
      {
        path: 'ubicacion',
        loadChildren: () =>
          import('./ubicacion/ubicacion.module').then((m) => m.UbicacionModule),
      },
      {
        path: 'procesos',
        loadChildren: () =>
          import('./procesos/procesos.module').then((m) => m.ProcesosModule),
      },
      {
        path: 'especialidad',
        loadChildren: () =>
          import('./especialidad/especialidad.module').then((m) => m.EspecialidadModule),
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
