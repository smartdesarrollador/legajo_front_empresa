import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Licencia,
  SelectOption,
  ConsultaLicenciasParams,
} from '../../interface/interface/consulta_licencias_trabajadores';

@Injectable({
  providedIn: 'root',
})
export class ConsultaLicenciasService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  consultarLicencias(params: ConsultaLicenciasParams): Observable<Licencia[]> {
    return this.http.get<Licencia[]>(
      `${this.apiUrl}/consulta-licencias-trabajadores`,
      { params: params as any }
    );
  }

  obtenerTrabajadores(id_user: number): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(
      `${this.apiUrl}/licencia/obtener-trabajadores`,
      {
        params: { id_user },
      }
    );
  }

  obtenerAreas(id_user: number): Observable<SelectOption[]> {
    return this.http.get<SelectOption[]>(
      `${this.apiUrl}/licencia/obtener-areas`,
      {
        params: { id_user },
      }
    );
  }
}
