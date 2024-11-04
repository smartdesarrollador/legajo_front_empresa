import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  mostrarSubmenu = false;
  mostrarMobileMenu = false;

  toggleSubmenu() {
    this.mostrarSubmenu = !this.mostrarSubmenu;
  }

  toggleMobileMenu() {
    this.mostrarMobileMenu = !this.mostrarMobileMenu;
  }
}
