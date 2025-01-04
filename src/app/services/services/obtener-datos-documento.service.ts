import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Document, Packer } from 'docx';
import { dateFunctions } from 'src/app/utils/dateFunctions';

// Importar todas las funciones de contratos docx
import { contratoInicioActividadDocx } from './funciones-contratos/contrato-inicio-actividad-docx';
import { contratoIncrementoActividadDocx } from './funciones-contratos/contrato-incremento-actividad-docx';
import { contratoDeEmergenciaDocx } from './funciones-contratos/contrato-de-emergencia-docx';
import { contratoIndeterminadoConFiscalizacionDocx } from './funciones-contratos/contrato-indeterminado-con-fiscalizacion-docx';
import { contratoIndeterminadoSinFiscalizacionDocx } from './funciones-contratos/contrato-indeterminado-sin-fiscalizacion-docx';
import { contratoIndeterminadoDocx } from './funciones-contratos/contrato-indeterminado-docx';
import { contratoInnominadoDocx } from './funciones-contratos/contrato-innominado-docx';
import { contratoIntermitenteDocx } from './funciones-contratos/contrato-intermitente-docx';
import { contratoNecesidadMercadoDocx } from './funciones-contratos/contrato-necesidad-mercado-docx';
import { contratoObraDeterminadaDocx } from './funciones-contratos/contrato-obra-determinada-docx';
import { contratoOcacionalDocx } from './funciones-contratos/contrato-ocacional-docx';
import { contratoPorSuplenciaDocx } from './funciones-contratos/contrato-por-suplencia-docx';
import { contratoPorTemporadaDocx } from './funciones-contratos/contrato-por-temporada-docx';
import { contratoReconversionEmpresarialDocx } from './funciones-contratos/contrato-reconversion-empresarial-docx';
import { contratoServicioEspecificoDocx } from './funciones-contratos/contrato-servicio-especifico-docx';

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
      actividad_economica: string;
      numero_partida_registral: string;
      numero_asiento: string;
      oficina_registral: string;
      dni_representante_legal: string;
      cargo_representante_legal: string;
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
      console.log('Tipo de contrato recibido:', datosLocales.modelo_contrato);
      if (!registroTrabajador || !registroEmpleador || !datosLocales) {
        throw new Error('Datos incompletos para generar el documento');
      }

      let doc: Document;

      switch (datosLocales.modelo_contrato.toUpperCase()) {
        case 'INDETERMINADO':
        case 'MODAL':
        case 'CONTRATO DE TRABAJO INDETERMINADO':
          doc = contratoIndeterminadoDocx(
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
          break;
        case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR INICIO DE ACTIVIDAD':
          doc = contratoInicioActividadDocx(
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
          break;
        case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR INCREMENTO DE ACTIVIDAD':
          doc = contratoIncrementoActividadDocx(
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
          break;
        case 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR EMERGENCIA':
          doc = contratoDeEmergenciaDocx(
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
          break;
        case 'CONTRATO DE TRABAJO INDETERMINADO CON FISCALIZACIÓN':
          doc = contratoIndeterminadoConFiscalizacionDocx(
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
          break;
        case 'CONTRATO DE TRABAJO INDETERMINADO SIN FISCALIZACIÓN':
          doc = contratoIndeterminadoSinFiscalizacionDocx(
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
          break;
        case 'CONTRATO DE TRABAJO INNOMINADO':
          doc = contratoInnominadoDocx(
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
          break;
        case 'CONTRATO DE TRABAJO INTERMITENTE':
          doc = contratoIntermitenteDocx(
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
          break;
        case 'CONTRATO DE TRABAJO POR NECESIDAD DE MERCADO':
          doc = contratoNecesidadMercadoDocx(
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
          break;
        case 'CONTRATO DE TRABAJO POR OBRA DETERMINADA':
          doc = contratoObraDeterminadaDocx(
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
          break;
        case 'CONTRATO DE TRABAJO OCASIONAL':
          doc = contratoOcacionalDocx(
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
          break;
        case 'CONTRATO DE TRABAJO POR SUPLENCIA':
          doc = contratoPorSuplenciaDocx(
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
          break;
        case 'CONTRATO DE TRABAJO POR TEMPORADA':
          doc = contratoPorTemporadaDocx(
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
          break;
        case 'CONTRATO DE TRABAJO POR RECONVERSIÓN EMPRESARIAL':
          doc = contratoReconversionEmpresarialDocx(
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
          break;
        case 'CONTRATO DE TRABAJO POR SERVICIO ESPECÍFICO':
          doc = contratoServicioEspecificoDocx(
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
          break;
        default:
          console.error(
            'Tipo de contrato recibido:',
            datosLocales.modelo_contrato
          );
          throw new Error(
            `Tipo de contrato no soportado: ${datosLocales.modelo_contrato}`
          );
      }

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
    } catch (error) {
      console.error('Error al generar documento:', error);
      throw error;
    }
  }

  private numeroALetras(numero: number): string {
    return numero.toString();
  }
}
