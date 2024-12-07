import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ConsultaVacacionesRequest,
  Vacaciones,
  TipoVacaciones,
  Trabajador,
} from '../interface/consulta_vacaciones_trabajadores.interface';

@Injectable({
  providedIn: 'root',
})
export class ConsultaVacacionesService {
  private apiUrl = `${environment.apiBaseUrl}/consulta-vacaciones-trabajadores`;

  constructor(private http: HttpClient) {}

  consultarVacaciones(
    params: ConsultaVacacionesRequest
  ): Observable<Vacaciones[]> {
    let httpParams = new HttpParams();

    if (params.fecha_desde) {
      httpParams = httpParams.set('fecha_desde', params.fecha_desde);
    }
    if (params.fecha_hasta) {
      httpParams = httpParams.set('fecha_hasta', params.fecha_hasta);
    }
    if (params.id_tipo_vacaciones) {
      httpParams = httpParams.set(
        'id_tipo_vacaciones',
        params.id_tipo_vacaciones.toString()
      );
    }
    if (params.id_trabajador) {
      httpParams = httpParams.set(
        'id_trabajador',
        params.id_trabajador.toString()
      );
    }
    httpParams = httpParams.set('id_user', params.id_user.toString());

    return this.http.get<Vacaciones[]>(this.apiUrl, { params: httpParams });
  }

  getTiposVacaciones(): Observable<TipoVacaciones[]> {
    return this.http.get<TipoVacaciones[]>(
      `${environment.apiBaseUrl}/vacaciones/consultar-tipos-vacaciones`
    );
  }

  getTrabajadores(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(
      `${environment.apiBaseUrl}/vacaciones/consultar-trabajadores`
    );
  }
}
