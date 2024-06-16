import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditModalComponent } from './add-edit-modal/add-edit-modal.component';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [AddEditModalComponent],
  imports: [CommonModule, RouterModule.forChild([]), SweetAlert2Module],
  exports: [AddEditModalComponent],
})
export class ModalModule {}
