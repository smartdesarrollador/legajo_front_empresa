import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contrato } from '../interface/contrato';
import { Area } from '../interface/area';
import { EstadoContrato } from '../interface/estado-contrato';
import { TipoContrato } from '../interface/tipo-contrato';
import { Trabajador } from '../interface/trabajador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContratoService {
  private apiUrl = `${environment.apiBaseUrl}/contratos`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener la lista de contratos con filtros.
   * @param filters Object con los filtros a aplicar.
   * @returns Observable<Paginacion>
   */
  getContratos(filters: any): Observable<Contrato[]> {
    let params = new HttpParams();
    if (filters.area) {
      params = params.set('area', filters.area);
    }
    if (filters.estado_contrato) {
      params = params.set('estado_contrato', filters.estado_contrato);
    }
    if (filters.trabajador) {
      params = params.set('trabajador', filters.trabajador);
    }
    if (filters.tipo_contrato) {
      params = params.set('tipo_contrato', filters.tipo_contrato);
    }

    return this.http
      .get<{ data: Contrato[] }>(this.apiUrl, { params })
      .pipe(map((response) => response.data));
  }

  /**
   * Obtener todas las áreas.
   * @returns Observable<Area[]>
   */
  getAreas(): Observable<Area[]> {
    return this.http
      .get<{ data: Area[] }>(`${this.apiUrl}/areas`)
      .pipe(map((response) => response.data));
  }

  /**
   * Obtener todos los estados de contrato.
   * @returns Observable<EstadoContrato[]>
   */
  getEstadosContrato(): Observable<EstadoContrato[]> {
    return this.http
      .get<{ data: EstadoContrato[] }>(`${this.apiUrl}/estados`)
      .pipe(map((response) => response.data));
  }

  /**
   * Obtener todos los tipos de contrato.
   * @returns Observable<TipoContrato[]>
   */
  getTiposContrato(): Observable<TipoContrato[]> {
    return this.http
      .get<{ data: TipoContrato[] }>(`${this.apiUrl}/tipos`)
      .pipe(map((response) => response.data));
  }

  /**
   * Obtener todos los trabajadores.
   * @returns Observable<Trabajador[]>
   */
  getTrabajadores(): Observable<Trabajador[]> {
    return this.http
      .get<{ data: Trabajador[] }>(`${this.apiUrl}/trabajadores`)
      .pipe(map((response) => response.data));
  }

  /**
   * Obtener los detalles de un contrato específico por ID.
   * @param id ID del contrato.
   * @returns Observable<Contrato>
   */
  getContratoById(id: number): Observable<Contrato> {
    return this.http
      .get<{ data: Contrato }>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }
}
