import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];

      console.log('Token recibido en la URL:', token);

      /* this.router.navigate(['/admin/dashboard']); */
      /* if (token) {
        this.authService.validateAndLoginWithToken(token);
      } else {
        console.error('No se encontró un token en la URL.');
        this.router.navigate(['/auth/login']);
      } */
    });
  }
}
