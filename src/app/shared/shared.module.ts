import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { TestNavbarComponent } from './test-navbar/test-navbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    TestNavbarComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    TestNavbarComponent,
  ],
})
export class SharedModule {}
