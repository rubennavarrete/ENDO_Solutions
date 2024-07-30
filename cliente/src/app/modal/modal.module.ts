import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PacienteModule } from '../components/paciente/paciente.module';
import { DoctorModule } from '../components/doctor/doctor.module';
import { UbicacionModule } from '../components/ubicacion/ubicacion.module';
import { ProcesosModule } from '../components/procesos/procesos.module';

@NgModule({
  declarations: [AddEditModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    SweetAlert2Module,
    PacienteModule,
    DoctorModule,
    UbicacionModule,
    ProcesosModule,
  ],
  exports: [AddEditModalComponent],
})
export class ModalModule {}
