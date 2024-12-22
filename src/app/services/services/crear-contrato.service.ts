import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface ContratoCreate {
  id_trabajador: number;
  id_empleador: number;
  jornada: number;
  tipo_contrato: number;
  fecha_periodo: string | null;

  oferta_laboral?: string;
  motivo_contrato?: string;
  evidencia_documentaria?: string;
  fecha_suplencia?: string | null;
  genero_suplencia?: string | null;
  proyecto_obra_determinada?: string | null;
  ubicacion_obra_determinada?: string | null;
  objeto_servicio_especifico?: string | null;
  nombre_servicio_especifico?: string | null;
  locacion_servicio_especifico?: string | null;
  objeto_contrato_temporada?: string | null;
  motivo_contrato_temporada?: string | null;
  evidencia_contrato_temporada?: string | null;
  remuneracion?: number;
  trabajador_confianza?: boolean;
  trabajador_direccion?: boolean;
  pregunta_1?: boolean;
  pregunta_2?: boolean;
  pregunta_3?: boolean;
  fiscalizacion_inmediata?: boolean;
  jornada_maxima?: boolean;
  dia_inicio: number;
  dia_final: number;
  horario_inicio?: string | null;
  horario_final?: string | null;
  prevencion_covid?: boolean;
  obligaciones_compromisos?: boolean;
  confidencialidad?: boolean;
  propiedad_intelectual?: boolean;
  tecnologia_informacion?: boolean;
  exclusividad?: boolean;
  proteccion_datos?: boolean;
}

export interface ResponseData {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CrearContratoService {
  private apiUrl = `${environment.apiBaseUrl}/contratos`;

  constructor(private http: HttpClient) {}

  crearContrato(contrato: ContratoCreate): Observable<ResponseData> {
    console.log('Datos a enviar:', contrato);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http
      .post<ResponseData>(`${this.apiUrl}/crear`, contrato, { headers })
      .pipe(
        tap((response) => console.log('Respuesta del servidor:', response)),
        catchError((error: HttpErrorResponse) => {
          console.error('Error completo:', error);
          let errorMessage = 'Ocurrió un error al crear el contrato';

          if (error.error instanceof ErrorEvent) {
            // Error del lado del cliente
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Error del lado del servidor
            if (error.status === 500) {
              errorMessage =
                'Error interno del servidor: ' +
                (error.error?.message || error.message);
              console.error('Error detallado del servidor:', error.error);
            } else {
              errorMessage = `Error ${error.status}: ${
                error.error?.message || 'Error desconocido'
              }`;
            }
          }

          return throwError(() => ({
            success: false,
            message: errorMessage,
            error: error.error,
          }));
        })
      );
  }
}
