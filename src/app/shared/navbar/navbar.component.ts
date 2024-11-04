import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  token: any;
  userData: any;
  email: any;

  public showDropdown: boolean = false;
  public showDropdownLogin: boolean = false;

  constructor(private router: Router) {}

  public toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  public toggleDropdownLogin(): void {
    this.showDropdownLogin = !this.showDropdownLogin;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token_empresa');

    this.userData = jwtDecode(this.token);

    this.email = this.userData.email;

    /*  console.log(this.token);
    console.log(this.userData.email); */
  }

  logout() {
    localStorage.removeItem('token_empresa');
    this.router.navigate(['auth/login']);
  }
}
