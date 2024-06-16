import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonPrimaryComponent } from './button-primary/button-primary.component';
import { ButtonModalComponent } from './button-modal/button-modal.component';

@NgModule({
  declarations: [ButtonPrimaryComponent, ButtonModalComponent],
  imports: [CommonModule],
  exports: [ButtonPrimaryComponent, ButtonModalComponent],
})
export class BotonesModule {}
