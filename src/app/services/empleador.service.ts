import { Injectable } from '@angular/core';
/* import { Empleador } from '../interface/empleador'; */
import { Empleador } from '../interface/empleador';
import { RegimenLaboral } from '../interface/regimen-laboral';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmpleadorService {
  url = environment.apiUrlEmpleador;
  urlUltimoEmpleador = environment.apiUrlUltimoEmpleador;
  urlActividadUltimoEmpleador = environment.apiUrlActividadUltimoEmpleador;

  apiUrl = environment.apiBaseUrl;

  /* selectTrabajador: Trabajador = new Trabajador(); */

  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer tu_token',
  });

  constructor(private http: HttpClient) {}

  getEmpleadores(): Observable<Empleador> {
    return this.http.get(this.url);
  }

  getEmpleadorById(id: number): Observable<Empleador> {
    const urlEmpleador = this.url + '/' + id;
    return this.http.get<Empleador>(urlEmpleador);
  }

  createEmpleador(Empleador: Empleador): Observable<Empleador> {
    console.log(Empleador);
    return this.http.post(this.url, Empleador, { headers: this.reqHeader });
  }

  /*   updateEmpleador(id: number, empleador: Empleador) {
    return this.http.put(this.url + '/' + id, empleador, {
      headers: this.reqHeader,
    });
  } */

  deleteCategory(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  getUltimoEmpleador(): Observable<Empleador> {
    return this.http.get(this.urlUltimoEmpleador);
  }

  getActividadUltimoEmpleador(): Observable<Empleador> {
    return this.http.get(this.urlActividadUltimoEmpleador);
  }

  /*  Nuevos metodos */

  // Método para obtener el empleador por id_user
  getEmpleadorByIdUser(id_user: number): Observable<Empleador> {
    return this.http
      .get<{ data: any }>(`${this.apiUrl}/empleador/user/${id_user}`)
      .pipe(map((response) => this.mapToEmpleador(response.data)));
  }

  // Método para mapear la respuesta a la interfaz Empleador
  private mapToEmpleador(data: any): Empleador {
    return {
      id_empleador: data.id_empleador,
      empleador: data.empleador,
      ruc: data.ruc,
      domicilio: data.domicilio,
      representante_legal: data.representante_legal,
      dni_representante_legal: data.dni_representante_legal,
      cargo_representante_legal: data.cargo_representante_legal,
      numero_partida_poderes: data.numero_partida_poderes,
      numero_asiento: data.numero_asiento,
      oficina_registral: data.oficina_registral,
      numero_partida_registral: data.numero_partida_registral,
      fecha_inicio_actividades: data.fecha_inicio_actividades,
      regimen_laboral: data.regimen_laboral.map((item: any) => ({
        id_regimen_laboral: item.id_regimen_laboral,
        regimen_laboral: item.regimen_laboral,
      })),
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  }

  getRegimenesLaborales(): Observable<RegimenLaboral[]> {
    return this.http
      .get<{ data: RegimenLaboral[] }>(`${this.apiUrl}/regimenes-laborales`)
      .pipe(map((response) => response.data));
  }

  // Método para actualizar el empleador
  updateEmpleador(
    id: number,
    empleadorData: Partial<Empleador>
  ): Observable<Empleador> {
    return this.http.put<Empleador>(
      `${this.apiUrl}/empleador/${id}`,
      empleadorData
    );
  }
}
