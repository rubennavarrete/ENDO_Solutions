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
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
@NgModule({
  declarations: [
    AgendaComponent
  ],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    // BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class AgendaModule { }