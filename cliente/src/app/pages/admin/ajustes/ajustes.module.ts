import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjustesComponent } from './ajustes.component';
import { AjustesRoutingModule } from './ajustes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AjustesComponent
  ],
  imports: [
    CommonModule,
    AjustesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AjustesModule { }
