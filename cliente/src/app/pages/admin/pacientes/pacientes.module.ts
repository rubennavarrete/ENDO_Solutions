import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';
import { PlaceholdersModule } from 'src/app/components/placeholders/placeholders.module';
import { ModalModule } from 'src/app/modal/modal.module';
import { BotonesModule } from 'src/app/components/botones/botones.module';
import { PacienteModule } from 'src/app/components/paciente/paciente.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'info_personal',
        loadChildren: () =>
          import('./pacientes-routing.module').then(
            (m) => m.PacientesRoutingModule
          ),
      },
      {
        path: 'info_medica',
        loadChildren: () =>
          import('./pacientes-routing.module').then(
            (m) => m.PacientesRoutingModule
          ),
      },
      {
        path: 'historial_consulta',
        loadChildren: () =>
          import('./pacientes-routing.module').then(
            (m) => m.PacientesRoutingModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [PacientesComponent],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    RouterModule.forChild(routes),
    PaginacionModule,
    PlaceholdersModule,
    ModalModule,
    BotonesModule,
    PacienteModule,
  ],
})
export class PacientesModule {}
