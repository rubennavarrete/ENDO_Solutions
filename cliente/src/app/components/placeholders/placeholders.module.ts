import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhTableComponent } from './ph-table/ph-table.component';
import { PhBaseComponent } from './ph-base/ph-base.component';

@NgModule({
  declarations: [PhTableComponent, PhBaseComponent],
  imports: [CommonModule],
  exports: [PhTableComponent, PhBaseComponent],
})
export class PlaceholdersModule {}
