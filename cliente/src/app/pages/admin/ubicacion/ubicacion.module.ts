import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbicacionComponent } from './ubicacion.component';
import { UbicacionRoutingModule } from './ubicacion-routing.module';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';
import { PlaceholdersModule } from 'src/app/components/placeholders/placeholders.module';
import { ModalModule } from 'src/app/modal/modal.module';
import { BotonesModule } from 'src/app/components/botones/botones.module';




@NgModule({
  declarations: [
    UbicacionComponent
  ],
  imports: [
    CommonModule,
    UbicacionRoutingModule,
    PaginacionModule,
    PlaceholdersModule,
    ModalModule,
    BotonesModule
  ]
})
export class UbicacionModule { }
