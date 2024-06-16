import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';
import { PlaceholdersModule } from 'src/app/components/placeholders/placeholders.module';
import { ModalModule } from 'src/app/modal/modal.module';
import { BotonesModule } from 'src/app/components/botones/botones.module';

// const routes: Routes = [{}];

@NgModule({
  declarations: [PacientesComponent],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    // RouterModule.forChild(routes),
    PaginacionModule,
    PlaceholdersModule,
    ModalModule,
    BotonesModule,
  ],
})
export class PacientesModule {}
