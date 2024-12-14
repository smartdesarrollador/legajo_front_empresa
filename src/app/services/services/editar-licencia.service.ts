import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LicenciaEdicion {
  fecha_emision: string;
  fecha_inicio: string;
  fecha_fin: string;
  jefe_vacaciones: string;
  motivo: string;
  goce_haber: string;
  id_area: number;
  id_trabajador: number;
  id_estado_permiso: number;
}

@Injectable({
  providedIn: 'root',
})
export class EditarLicenciaService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  obtenerLicencia(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/licencias/${id}`);
  }

  editarLicencia(id: number, licencia: LicenciaEdicion): Observable<any> {
    return this.http.put(`${this.apiUrl}/licencia/editar/${id}`, licencia);
  }

  obtenerAreas(id_user: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/licencia/obtener-areas`, {
      params: { id_user },
    });
  }

  obtenerTrabajadores(id_user: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/licencia/obtener-trabajadores`,
      {
        params: { id_user },
      }
    );
  }
}
