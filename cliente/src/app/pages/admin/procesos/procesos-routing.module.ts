import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcesosComponent } from './procesos.component';

const routes: Routes = [{path: '', component: ProcesosComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesosRoutingModule { }
