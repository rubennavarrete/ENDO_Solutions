import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctoresRoutingModule } from './doctores-routing.module';
import { DoctoresComponent } from './doctores.component';


@NgModule({
  declarations: [
    DoctoresComponent
  ],
  imports: [
    CommonModule,
    DoctoresRoutingModule
  ]
})
export class DoctoresModule { }
