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
import { AgendaComponent } from './agenda.component';;
import { RouterModule, Routes } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PlaceholdersModule } from 'src/app/components/placeholders/placeholders.module';
import { ModalModule } from 'src/app/modal/modal.module';
import { BotonesModule } from 'src/app/components/botones/botones.module';

// import { FlatpickrModule } from 'angularx-flatpickr';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AgendaComponent
  ],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    PlaceholdersModule,
    ModalModule,
    BotonesModule,
    // BrowserAnimationsModule,
    // NgbModalModule,
    // FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class AgendaModule { }