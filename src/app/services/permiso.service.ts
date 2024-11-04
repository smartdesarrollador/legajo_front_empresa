import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
}
