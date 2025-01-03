import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Document, Packer } from 'docx';
import { contratoInicioActividadDocx } from './funciones-contratos.ts/contrato-inicio-actividad-docx';
import { dateFunctions } from 'src/app/utils/dateFunctions';

interface ContratoDocumentoResponse {
  success: boolean;
  message: string;
  data: {
    contrato: {
      numero: number;
      fecha_inicio: string;
      fecha_fin: string;
      observacion: string;
      estado: string;
      tipo_contrato: string;
      jornada_laboral: string;
    };
    empleador: {
      nombre: string;
      ruc: string;
      domicilio: string;
      representante_legal: string;
    };
    trabajador: {
      nombres: string;
      apellidos: string;
      numero_documento: string;
      direccion: string;
      area: string;
      cargo: string;
      funciones: string;
    };
    detalle: {
      remuneracion: number;
      horario_inicio: string;
      horario_final: string;
      dia_inicio: string;
      dia_final: string;
      oferta_laboral: string;
      motivo_contrato: string;
      evidencia_documentaria: string;
      fecha_suplencia: string;
      genero_suplencia: string;
      proyecto_obra_determinada: string;
      ubicacion_obra_determinada: string;
      objeto_servicio_especifico: string;
      nombre_servicio_especifico: string;
      locacion_servicio_especifico: string;
      objeto_contrato_temporada: string;
      motivo_contrato_temporada: string;
      evidencia_contrato_temporada: string;
    };
    condiciones: {
      trabajador_confianza: boolean;
      trabajador_direccion: boolean;
      pregunta_1: string;
      pregunta_2: string;
      pregunta_3: string;
      fiscalizacion_inmediata: boolean;
      jornada_maxima: boolean;
      prevencion_covid: boolean;
      obligaciones_compromisos: boolean;
      confidencialidad: boolean;
      propiedad_intelectual: boolean;
      tecnologia_informacion: boolean;
      exclusividad: boolean;
      proteccion_datos: boolean;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ObtenerDatosDocumentoService {
  private apiUrl = `${environment.apiBaseUrl}/contratos`;

  constructor(
    private http: HttpClient,
    private convertirFormatoFecha: dateFunctions
  ) {}

  obtenerDatosDocumento(id: number): Observable<ContratoDocumentoResponse> {
    return this.http.get<ContratoDocumentoResponse>(
      `${this.apiUrl}/${id}/documento`
    );
  }

  async generarDocumentoContrato(
    registroTrabajador: any,
    registroEmpleador: any,
    datosLocales: any,
    prueba_meses: string,
    prueba_inicio: string,
    prueba_termino: string,
    fechaFormateada: string,
    num_valores: Array<string>,
    fechaActualValor: string
  ): Promise<void> {
    try {
      // Validar datos antes de procesar
      if (!registroTrabajador || !registroEmpleador || !datosLocales) {
        throw new Error('Datos incompletos para generar el documento');
      }

      console.log('Datos para generar documento:', {
        registroTrabajador,
        registroEmpleador,
        datosLocales,
        prueba_meses,
        prueba_inicio,
        prueba_termino,
        fechaFormateada,
        num_valores,
        fechaActualValor,
      });

      const doc = contratoInicioActividadDocx(
        registroTrabajador,
        registroEmpleador,
        datosLocales,
        prueba_meses,
        prueba_inicio,
        prueba_termino,
        fechaFormateada,
        num_valores,
        fechaActualValor,
        this.convertirFormatoFecha
      );

      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = `Contrato_${
        datosLocales.oferta_laboral || 'sin_nombre'
      }.docx`;
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Error detallado al generar el documento:', err);
      console.error('Stack trace:', err.stack);
      throw err;
    }
  }

  private numeroALetras(numero: number): string {
    return numero.toString();
  }
}
