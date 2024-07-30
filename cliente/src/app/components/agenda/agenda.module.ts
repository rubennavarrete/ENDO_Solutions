import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarCitaComponent } from './agregar-cita/agregar-cita.component';
import { EditarCitaComponent } from './editar-cita/editar-cita.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotonesModule } from '../botones/botones.module';
import { PlaceholdersModule } from '../placeholders/placeholders.module';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';


@NgModule({
  declarations: [
    AgregarCitaComponent,
    EditarCitaComponent
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
  exports: [AgregarCitaComponent, EditarCitaComponent],
})
export class AgendaModule { }
