import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient, private router: Router) {}

  validateAndLoginWithToken(token: string): void {
    this.http.post(`${this.apiUrl}/validate-token`, { token }).subscribe({
      next: (response: any) => {
        if (response.valid) {
          console.log('Token válido, iniciando sesión.');
          localStorage.setItem('token_empresa', token);
          localStorage.setItem('user', JSON.stringify(response.user));

          // Redirigir al dashboard.
          this.router.navigate(['/admin/dashboard']);
        } else {
          console.error('Token inválido');
          this.router.navigate(['/auth/login']);
        }
      },
      error: (error) => {
        console.error('Error validando el token:', error);
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
