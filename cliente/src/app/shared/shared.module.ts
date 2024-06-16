import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [SidebarComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
