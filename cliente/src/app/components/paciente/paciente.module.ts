import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotonesModule } from '../botones/botones.module';
import { PlaceholdersModule } from '../placeholders/placeholders.module';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';
import { AgregarPacienteComponent } from './agregar-paciente/agregar-paciente.component';
import { MostrarPacienteComponent } from './mostrar-paciente/mostrar-paciente.component';
import { InfoMedicaComponent } from './info-medica/info-medica.component';
import { MostrarHCComponent } from './mostrar-hc/mostrar-hc.component';
import { AgregarHCComponent } from './agregar-hc/agregar-hc.component';
import { EditarHCComponent } from './editar-hc/editar-hc.component';

@NgModule({
  declarations: [
    AgregarPacienteComponent,
    EditarPacienteComponent,
    MostrarPacienteComponent,
    InfoMedicaComponent,
    MostrarHCComponent,
    AgregarHCComponent,
    EditarHCComponent,
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
    AgregarPacienteComponent,
    EditarPacienteComponent,
    MostrarPacienteComponent,
    InfoMedicaComponent,
    MostrarHCComponent,
    AgregarHCComponent,
    EditarHCComponent,
  ],
})
export class PacienteModule {}
