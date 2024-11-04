import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  // Método para solicitar el token temporal
  generateTemporaryToken(userId: number): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/generate-temporary-token`,
      { user_id: userId }
    );
  }
}
