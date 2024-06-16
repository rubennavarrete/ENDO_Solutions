import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import config from 'config/config';
import { Layouts } from './layout/layout';
import { HomeModule } from './pages/home/home.module';
import { FailedModule } from './pages/failed/failed.module';
import { LoginModule } from './pages/login/login.module';
import { DeniedModule } from './pages/denied/denied.module';
import { AdminModule } from './pages/admin/admin.module';

const routes: Routes = [
  {
    path: config.URL_BASE_PATH,
    data: { layout: Layouts.Simple },
    children: [
      { path: '', loadChildren: () => HomeModule },
      { path: '404', loadChildren: () => FailedModule },
      { path: 'denegado', loadChildren: () => DeniedModule },
      { path: 'login', loadChildren: () => LoginModule },
    ],
  },
  {
    path: config.URL_BASE_PATH,
    data: { layout: Layouts.Full },
    // canActivate: [PermisoGuard, RolesGuard],
    children: [{ path: '', loadChildren: () => AdminModule }],
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
