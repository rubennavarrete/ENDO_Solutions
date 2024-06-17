import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './modal/modal.module';
import { LayoutModule } from './layout/layout.module';
// import { EditarDoctorComponent } from './components/doctor/editar-doctor/editar-doctor.component';
// import { AgregarDoctorComponent } from './components/doctor/agregar-doctor/agregar-doctor.component';

@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    LayoutModule,
    ModalModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
