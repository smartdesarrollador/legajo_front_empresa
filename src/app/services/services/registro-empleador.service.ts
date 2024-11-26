import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleador } from 'src/app/interface/interface/registro-empleador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistroEmpleadorService {
  private apiUrl = `${environment.apiBaseUrl}/registro-empleador`;

  constructor(private http: HttpClient) {}

  getEmpleadorByUserId(userId: number): Observable<Empleador> {
    return this.http.get<Empleador>(`${this.apiUrl}/${userId}`);
  }
}
