import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesosRoutingModule } from './procesos-routing.module';
import { ProcesosComponent } from './procesos.component';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';
import { PlaceholdersModule } from 'src/app/components/placeholders/placeholders.module';
import { ModalModule } from 'src/app/modal/modal.module';
import { BotonesModule } from 'src/app/components/botones/botones.module';


@NgModule({
  declarations: [
    ProcesosComponent
  ],
  imports: [
    CommonModule,
    ProcesosRoutingModule,PaginacionModule,
    ModalModule,
    PlaceholdersModule,
    BotonesModule
  ]
})
export class ProcesosModule { }
