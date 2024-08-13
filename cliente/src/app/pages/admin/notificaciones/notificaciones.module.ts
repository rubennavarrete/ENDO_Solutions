import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesComponent } from './notificaciones.component';
import { NotificacionesRoutingModule } from './notificaciones-routing.module';


@NgModule({
  declarations: [
    NotificacionesComponent
  ],
  imports: [
    CommonModule,
    NotificacionesRoutingModule
  ]
})
export class NotificacionesModule { }
