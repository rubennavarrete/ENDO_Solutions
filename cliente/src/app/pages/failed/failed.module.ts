import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FailedRoutingModule } from './failed-routing.module';
import { FailedComponent } from './failed.component';

@NgModule({
  declarations: [FailedComponent],
  imports: [CommonModule, FailedRoutingModule],
  exports: [FailedComponent],
})
export class FailedModule {}
