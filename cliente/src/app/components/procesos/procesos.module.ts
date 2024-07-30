import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarProcesoComponent } from './agregar-proceso/agregar-proceso.component';
import { EditarProcesoComponent } from './editar-proceso/editar-proceso.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotonesModule } from '../botones/botones.module';
import { PlaceholdersModule } from '../placeholders/placeholders.module';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';


@NgModule({
  declarations: [
    AgregarProcesoComponent,
    EditarProcesoComponent
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
    AgregarProcesoComponent,
    EditarProcesoComponent
  ]
})
export class ProcesosModule { }
