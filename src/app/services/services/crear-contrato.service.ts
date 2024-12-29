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
  genero_suplencia?: string;
  proyecto_obra_determinada?: string;
  ubicacion_obra_determinada?: string;
  objeto_servicio_especifico?: string;
  nombre_servicio_especifico?: string;
  locacion_servicio_especifico?: string;
  objeto_contrato_temporada?: string;
  motivo_contrato_temporada?: string;
  evidencia_contrato_temporada?: string;
  remuneracion?: number;
  trabajador_confianza?: boolean;
  trabajador_direccion?: boolean;
  pregunta_1?: string;
  pregunta_2?: string;
  pregunta_3?: string;
  fiscalizacion_inmediata?: boolean;
  jornada_maxima?: boolean;
  dia_inicio: string;
  dia_final: string;
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
    // Validar campos requeridos
    if (!contrato.dia_inicio || !contrato.dia_final) {
      return throwError(() => ({
        success: false,
        message: 'Los días de inicio y fin son campos requeridos',
        error: 'Required fields missing',
      }));
    }

    // Validar formato de hora antes de enviar
    const validarFormatoHora = (hora: string | null | undefined): boolean => {
      if (!hora) return true;
      const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
      return regex.test(hora);
    };

    // Validar las horas antes de enviar
    if (
      !validarFormatoHora(contrato.horario_inicio) ||
      !validarFormatoHora(contrato.horario_final)
    ) {
      return throwError(() => ({
        success: false,
        message: 'El formato de hora debe ser HH:mm:ss',
        error: 'Invalid time format',
      }));
    }

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
            errorMessage = `Error: ${error.error.message}`;
          } else {
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
