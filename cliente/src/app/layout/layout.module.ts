import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FullLayoutComponent, SimpleLayoutComponent],
  imports: [CommonModule, RouterModule.forChild([]), SharedModule],
  exports: [FullLayoutComponent, SimpleLayoutComponent],
})
export class LayoutModule {}
