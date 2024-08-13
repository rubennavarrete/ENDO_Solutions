import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjustesComponent } from './ajustes.component';
import { AjustesRoutingModule } from './ajustes-routing.module';


@NgModule({
  declarations: [
    AjustesComponent
  ],
  imports: [
    CommonModule,
    AjustesRoutingModule
  ]
})
export class AjustesModule { }
