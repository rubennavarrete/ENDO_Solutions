import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctoresRoutingModule } from './doctores-routing.module';
import { DoctoresComponent } from './doctores.component';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';
import { PlaceholdersModule } from 'src/app/components/placeholders/placeholders.module';
import { ModalModule } from 'src/app/modal/modal.module';
import { BotonesModule } from 'src/app/components/botones/botones.module';


@NgModule({
  declarations: [
    DoctoresComponent
  ],
  imports: [
    CommonModule,
    DoctoresRoutingModule,
    PaginacionModule,
    PlaceholdersModule,
    ModalModule,
    BotonesModule,
  ]
})
export class DoctoresModule { }
