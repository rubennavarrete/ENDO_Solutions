import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotonesModule } from '../botones/botones.module';
import { PlaceholdersModule } from '../placeholders/placeholders.module';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';
import { AgregarPacienteComponent } from './agregar-paciente/agregar-paciente.component';

@NgModule({
  declarations: [AgregarPacienteComponent, EditarPacienteComponent],
  imports: [
    CommonModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    BotonesModule,
    ReactiveFormsModule,
    PlaceholdersModule,
    PaginacionModule,
  ],
  exports: [AgregarPacienteComponent, EditarPacienteComponent],
})
export class PacienteModule {}
