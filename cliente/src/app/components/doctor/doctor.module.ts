import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotonesModule } from '../botones/botones.module';
import { PlaceholdersModule } from '../placeholders/placeholders.module';
import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';
import { AgregarDoctorComponent } from './agregar-doctor/agregar-doctor.component';
import { EditarDoctorComponent } from './editar-doctor/editar-doctor.component';


@NgModule({
  declarations: [
    AgregarDoctorComponent,
    EditarDoctorComponent
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
  exports: [AgregarDoctorComponent, EditarDoctorComponent],
})
export class DoctorModule { }
