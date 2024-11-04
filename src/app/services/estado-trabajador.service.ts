import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoTrabajador } from '../interface/estado-trabajador';
import { environment } from '../../environments/environment'; // Importa environment

@Injectable({
  providedIn: 'root',
})
export class EstadoTrabajadorService {
  private apiUrl = `${environment.apiBaseUrl}/estados_trabajador`; // Usa la URL del environment

  constructor(private http: HttpClient) {}

  getEstadosTrabajador(): Observable<EstadoTrabajador[]> {
    return this.http.get<EstadoTrabajador[]>(this.apiUrl);
  }
}
