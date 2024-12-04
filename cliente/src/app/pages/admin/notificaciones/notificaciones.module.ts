import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesComponent } from './notificaciones.component';
import { NotificacionesRoutingModule } from './notificaciones-routing.module';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';
import { PlaceholdersModule } from 'src/app/components/placeholders/placeholders.module';
import { ModalModule } from 'src/app/modal/modal.module';
import { BotonesModule } from 'src/app/components/botones/botones.module';


@NgModule({
  declarations: [
    NotificacionesComponent
  ],
  imports: [
    CommonModule,
    NotificacionesRoutingModule,
    PaginacionModule,
    ModalModule,
    PlaceholdersModule,
    BotonesModule
  ]
})
export class NotificacionesModule { }

