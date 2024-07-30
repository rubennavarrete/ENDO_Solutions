import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotonesModule } from '../botones/botones.module';
import { PlaceholdersModule } from '../placeholders/placeholders.module';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';
import { AgregarUbicacionComponent } from './agregar-ubicacion/agregar-ubicacion.component';
import { EditarUbicacionComponent } from './editar-ubicacion/editar-ubicacion.component';

@NgModule({
  declarations: [
    AgregarUbicacionComponent,
    EditarUbicacionComponent
  ],
  imports: [
    CommonModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    BotonesModule,
    ReactiveFormsModule,
    PlaceholdersModule,
    PaginacionModule,
  ],
  exports: [AgregarUbicacionComponent, EditarUbicacionComponent],
})
export class UbicacionModule { }
