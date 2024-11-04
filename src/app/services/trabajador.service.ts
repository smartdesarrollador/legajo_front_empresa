import { Injectable } from '@angular/core';
import { Trabajador } from '../interface/trabajador';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TrabajadorService {
  // URL base para trabajadores
  apiUrl = `${environment.apiBaseUrl}`;
  token: any;
  userData: any;
  userId: any;

  apiUrlTrabajadores = `${environment.apiBaseUrl}/trabajadores`;

  // Headers de solicitud con autorización
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer tu_token',
  });

  constructor(private http: HttpClient) {}

  // Obtener lista de trabajadores con filtros opcionales
  getTrabajadores(
    area?: number,
    tipoContrato?: number
  ): Observable<Trabajador[]> {
    let params = new HttpParams();

    this.token = localStorage.getItem('token_empresa');

    this.userData = jwtDecode(this.token);

    this.userId = this.userData.user_id;

    if (this.userId) {
      params = params.set('user_id', this.userId.toString());
    } else {
      console.warn('user_id no está definido');
    }

    if (area) {
      params = params.set('area', area.toString());
    }
    if (tipoContrato) {
      params = params.set('tipo_contrato', tipoContrato.toString());
    }

    /*  params = params.set('user_id', this.userId.toString()); */

    // Realizar la solicitud HTTP
    return this.http
      .get<{ data: Trabajador[] }>(this.apiUrlTrabajadores, { params })
      .pipe(
        // Extraer la propiedad "data" que contiene el array de trabajadores
        map((response) => response.data || []),
        // Registrar en consola para depuración
        tap((trabajadores) =>
          console.log('Trabajadores recibidos:', trabajadores)
        )
      );
  }

  getTrabajadoresListar(): Observable<Trabajador> {
    return this.http.get(this.apiUrlTrabajadores);
  }

  // Obtener trabajador por ID
  getTrabajadorById(id: number): Observable<Trabajador> {
    const urlTrabajador = `${this.apiUrlTrabajadores}/${id}`;
    return this.http.get<Trabajador>(urlTrabajador);
  }

  // Crear un nuevo trabajador
  createTrabajador(trabajador: Trabajador): Observable<Trabajador> {
    return this.http.post<Trabajador>(
      `${this.apiUrl}/trabajadores/create`,
      trabajador,
      { headers: this.reqHeader }
    );
  }

  // Métodos adicionales para obtener datos relacionados
  getOcupaciones(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/ocupaciones`)
      .pipe(map((response) => response.data));
  }

  getRegimenesLaborales(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/regimenes-laborales`)
      .pipe(map((response) => response.data));
  }

  /*  getAreas(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/areas`)
      .pipe(map((response) => response.data));
  } */

  getAreas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/areas`).pipe(
      map((response) => response) // Aquí el response ya es el array de áreas, no hace falta acceder a 'data'
    );
  }

  getNivelesEducativos(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/niveles-educativos`)
      .pipe(map((response) => response.data));
  }

  getRegimenesSalud(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/regimenes-salud`)
      .pipe(map((response) => response.data));
  }

  getRegimenesPensiones(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/regimenes-pensiones`)
      .pipe(map((response) => response.data));
  }

  getAfp(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/afps`)
      .pipe(map((response) => response.data));
  }

  getUbigeos(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/ubigeos`)
      .pipe(map((response) => response.data));
  }

  getEmpleadores(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/empleadores`)
      .pipe(map((response) => response.data));
  }

  /* getEstadosTrabajador(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/estados_trabajador`)
      .pipe(map((response) => response.data));
  } */

  getEstadosTrabajador(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estados_trabajador`).pipe(
      map((response) => response) // Aquí el response ya es el array de estados de trabajador, no hace falta acceder a 'data'
    );
  }

  getJornadasLaborales(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/jornadas-laborales`)
      .pipe(map((response) => response.data));
  }

  getTiposDocumento(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/tipos-documento`)
      .pipe(map((response) => response.data));
  }
}
