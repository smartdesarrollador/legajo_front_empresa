import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permisos } from '../interface/permisos';
import { FiltroPermisos } from '../interface/filtro-permisos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PermisoService {
  private apiUrl = `${environment.apiBaseUrl}/permisos`;
  private apiUrlEditar = `${environment.apiBaseUrl}/editar-permisos`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene una lista de todos los permisos con filtros opcionales.
   *
   * @param filtros - Los filtros de búsqueda para el listado de permisos.
   * @returns Observable con la lista de todos los permisos.
   */
  getPermisos(filtros: FiltroPermisos): Observable<Permisos[]> {
    let params = new HttpParams();

    // Agregar filtros opcionales si están presentes
    if (filtros.id_trabajador) {
      params = params.set('id_trabajador', filtros.id_trabajador.toString());
    }
    if (filtros.fecha_inicio) {
      params = params.set('fecha_inicio', filtros.fecha_inicio);
    }
    if (filtros.fecha_fin) {
      params = params.set('fecha_fin', filtros.fecha_fin);
    }

    return this.http.get<{ data: Permisos[] }>(this.apiUrl, { params }).pipe(
      map((response) => {
        // Ajustar la lista de permisos de la propiedad `data`
        return response.data.map(
          (item): Permisos => ({
            ...item,
            area: item.area || undefined,
            trabajador: item.trabajador || undefined,
            estado_permiso: item.estado_permiso || undefined,
          })
        );
      })
    );
  }

  /**
   * Obtiene los detalles de un permiso específico.
   *
   * @param id - ID del permiso que se desea consultar.
   * @returns Observable con los detalles del permiso.
   */
  getPermisoById(id: number): Observable<Permisos> {
    return this.http.get<{ data: Permisos }>(`${this.apiUrl}/${id}`).pipe(
      map((response) => ({
        ...response.data,
        area: response.data.area || null,
        trabajador: response.data.trabajador || null,
        estado_permiso: response.data.estado_permiso || null,
      }))
    );
  }

  /**
   * Crea un nuevo permiso en el sistema.
   *
   * @param permiso - Los datos del nuevo permiso a crear.
   * @returns Observable con el permiso creado.
   */
  createPermiso(permiso: Permisos): Observable<Permisos> {
    return this.http.post<{ data: Permisos }>(this.apiUrl, permiso).pipe(
      map((response) => ({
        ...response.data,
        area: response.data.area || null,
        trabajador: response.data.trabajador || null,
        estado_permiso: response.data.estado_permiso || null,
      }))
    );
  }

  /**
   * Obtiene un permiso específico para editar
   */
  getPermisoParaEditar(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  /**
   * Actualiza un permiso existente
   */
  editarPermiso(id: number, permiso: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    const permisoData = {
      fecha_inicio: permiso.fecha_inicio,
      fecha_fin: permiso.fecha_fin,
      horas: permiso.horas,
      motivo: permiso.motivo,
      id_area: permiso.id_area,
      id_trabajador: permiso.id_trabajador,
      jefe_inmediato: permiso.jefe_inmediato,
      id_estado_permiso: permiso.id_estado_permiso,
    };

    return this.http
      .put<any>(`${this.apiUrlEditar}/${id}`, permisoData, { headers })
      .pipe(
        map((response) => {
          if (response.status === 'success') {
            return {
              success: true,
              message: response.message,
              data: response.data,
            };
          } else {
            throw new Error(
              response.message || 'Error al actualizar el permiso'
            );
          }
        })
      );
  }

  /**
   * Obtiene las áreas disponibles
   */
  getAreas(): Observable<any[]> {
    return this.http
      .get<any>(`${environment.apiBaseUrl}/areas`)
      .pipe(map((response) => response.data));
  }

  /**
   * Obtiene los estados de permiso disponibles
   */
  getEstadosPermiso(): Observable<any[]> {
    return this.http
      .get<any>(`${environment.apiBaseUrl}/estados-permiso`)
      .pipe(map((response) => response.data));
  }

  /**
   * Obtiene los trabajadores disponibles
   */
  getTrabajadores(): Observable<any[]> {
    return this.http
      .get<any>(`${environment.apiBaseUrl}/trabajadores`)
      .pipe(map((response) => response.data));
  }
}
