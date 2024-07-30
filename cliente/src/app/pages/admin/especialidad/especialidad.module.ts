import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialidadRoutingModule } from './especialidad-routing.module';
import { EspecialidadComponent } from './especialidad.component';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';
import { PlaceholdersModule } from 'src/app/components/placeholders/placeholders.module';
import { ModalModule } from 'src/app/modal/modal.module';
import { BotonesModule } from 'src/app/components/botones/botones.module';


@NgModule({
  declarations: [
    EspecialidadComponent
  ],
  imports: [
    CommonModule,
    EspecialidadRoutingModule,
    PaginacionModule,
    ModalModule,
    PlaceholdersModule,
    BotonesModule
  ]
})
export class EspecialidadModule { }
