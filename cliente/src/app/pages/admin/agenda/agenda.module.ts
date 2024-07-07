// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { AgendaRoutingModule } from './agenda-routing.module';
// import { AgendaComponent } from './agenda.component';
// import { RouterModule, Routes } from '@angular/router';
// import { LayoutModule } from 'src/app/layout/layout.module';
// import { PaginacionModule } from 'src/app/shared/paginacion/paginacion.module';

// const routes: Routes = [{}];

// @NgModule({
//   declarations: [AgendaComponent],
//   imports: [
//     CommonModule,
//     AgendaRoutingModule,
//     RouterModule.forChild(routes),
//     LayoutModule,
//     PaginacionModule,
//   ],
// })
// export class AgendaModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [
    AgendaComponent
  ],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    
  ]
})
export class AgendaModule { }