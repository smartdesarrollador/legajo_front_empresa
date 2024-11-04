import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleador } from 'src/app/interface/empleador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpleadorService {
  private apiUrl = `${environment.apiBaseUrl}/empleadores`; // URL de tu API en Laravel

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de empleadores
  getEmpleadores(): Observable<Empleador[]> {
    return this.http.get<Empleador[]>(this.apiUrl);
  }
}
