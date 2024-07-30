import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarEspeComponent } from './agregar-espe/agregar-espe.component';
import { EditarEspeComponent } from './editar-espe/editar-espe.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotonesModule } from '../botones/botones.module';
import { PlaceholdersModule } from '../placeholders/placeholders.module';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';


@NgModule({
  declarations: [
    AgregarEspeComponent,
    EditarEspeComponent
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
  exports: [
    AgregarEspeComponent,
    EditarEspeComponent
  ],
})
export class EspecialidadesModule { }
