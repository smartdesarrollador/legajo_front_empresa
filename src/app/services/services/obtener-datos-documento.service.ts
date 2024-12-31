import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from 'docx';

@Injectable({
  providedIn: 'root',
})
export class ObtenerDatosDocumentoService {
  private apiUrl = `${environment.apiBaseUrl}/contratos`;

  constructor(private http: HttpClient) {}

  obtenerDatosDocumento(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/documento`);
  }

  async generarDocumento(datos: any): Promise<void> {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Título
            new Paragraph({
              text: 'CONTRATO DE TRABAJO SUJETO A MODALIDAD POR INICIO DE ACTIVIDAD',
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 200 },
            }),

            // Primer párrafo
            new Paragraph({
              text: 'Conste mediante el presente documento, suscrito por duplicado con igual valor y tenor, el Contrato Individual de Trabajo por inicio de actividad que celebran, de conformidad con lo establecido por el Texto Único Ordenado del Decreto Legislativo N° 728 – Ley de Productividad y Competitividad Laboral aprobado por el Decreto Supremo N° 003-97-TR, de una parte,',
              spacing: { after: 200 },
            }),

            // Datos del Empleador
            new Paragraph({
              children: [
                new TextRun({
                  text: `- ${datos.empleador.nombre}     identificada con RUC Nº ${datos.empleador.ruc}, con domicilio en ${datos.empleador.direccion}, debidamente representada por ${datos.empleador.representante_legal} identificado con DNI Nº __________ en calidad de _______, según poder inscrito en la Partida Electrónica Nº _____ Asiento ________ del Registro de Personas Jurídicas de la Oficina Registral de ______, a quien en adelante se le denominará EL EMPLEADOR y de la otra parte,\n\n`,
                }),
              ],
            }),

            // Datos del Trabajador
            new Paragraph({
              children: [
                new TextRun({
                  text: `- ${datos.trabajador.nombres} ${datos.trabajador.apellidos} identificado con DNI Nº ${datos.trabajador.dni}, domiciliado en ${datos.trabajador.direccion}, provincia y Departamento de Lima, a quien en adelante se le denominará EL TRABAJADOR.\n\n`,
                }),
              ],
            }),

            // Las Partes
            new Paragraph({
              text: 'A quienes se les puede denominar "LAS PARTES", en los términos y condiciones siguientes:',
              spacing: { after: 200 },
            }),

            // CLÁUSULA PRIMERA
            new Paragraph({
              children: [
                new TextRun({
                  text: 'CLÁUSULA PRIMERA. - ANTECEDENTES',
                  bold: true,
                }),
              ],
              spacing: { before: 200, after: 200 },
            }),

            new Paragraph({
              text: `1.1. EL EMPLEADOR es una persona jurídica constituida bajo las leyes de la República de Perú que corre inscrita en la Partida Electrónica Nº ______ del Registro de Personas Jurídicas de _________ y tiene por objeto social dedicarse a ________.\n\n`,
            }),

            new Paragraph({
              text: `1.2. Siendo que EL EMPLEADOR inició sus actividades con fecha ${datos.contrato.fecha_inicio}, tal como consta en el Registro de SUNAT, requiere contratar de manera temporal los servicios de un profesional para desempeñar el cargo de ${datos.trabajador.cargo}.\n\n`,
            }),

            // CLÁUSULA SEGUNDA
            new Paragraph({
              children: [
                new TextRun({
                  text: 'CLÁUSULA SEGUNDA. - OBJETO DEL CONTRATO',
                  bold: true,
                }),
              ],
              spacing: { before: 200, after: 200 },
            }),

            new Paragraph({
              text: `Siendo que las actividades de EL EMPLEADOR iniciaron con fecha ${datos.contrato.fecha_inicio}, por medio del presente contrato, y al amparo de la legislación laboral vigente, EL EMPLEADOR contrata de forma temporal y bajo la modalidad de inicio de actividad a EL TRABAJADOR, para que desempeñe sus funciones en el puesto de ${datos.trabajador.cargo} y lo haga de manera personal, bajo subordinación...`,
            }),

            // CLÁUSULA SEXTA - JORNADA LABORAL
            new Paragraph({
              children: [
                new TextRun({
                  text: 'CLÁUSULA SEXTA. - JORNADA LABORAL',
                  bold: true,
                }),
              ],
              spacing: { before: 200, after: 200 },
            }),

            new Paragraph({
              text: `El horario de trabajo será de ${datos.detalle.dia_inicio} a ${datos.detalle.dia_final} de ${datos.detalle.horario_inicio} a ${datos.detalle.horario_final}, incluido los 45 minutos de refrigerio, los cuales no forman parte de la jornada ni del horario de trabajo.\n\n`,
            }),

            // CLÁUSULA OCTAVA - REMUNERACIÓN
            new Paragraph({
              children: [
                new TextRun({
                  text: 'CLÁUSULA OCTAVA.- REMUNERACIÓN',
                  bold: true,
                }),
              ],
              spacing: { before: 200, after: 200 },
            }),

            new Paragraph({
              text: `EL TRABAJADOR percibirá como contraprestación por sus servicios una remuneración mensual básica ascendente a S/ ${
                datos.detalle.remuneracion
              }.00 (${this.numeroALetras(
                datos.detalle.remuneracion
              )} con 00/100 soles), durante el tiempo de duración de la relación laboral.\n\n`,
            }),

            // Firmas
            new Paragraph({
              text: `\n\nHecho y firmado en Lima, ${new Date().toLocaleDateString()}, en dos ejemplares de un mismo tenor para constancia de las partes.\n\n\n`,
              alignment: AlignmentType.CENTER,
              spacing: { before: 400 },
            }),

            new Paragraph({
              text: '____________________________                                   ____________________________',
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              text: 'EL EMPLEADOR                                                                EL TRABAJADOR',
              alignment: AlignmentType.CENTER,
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = `Contrato_${datos.contrato.numero}.docx`;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  private numeroALetras(numero: number): string {
    // Aquí puedes implementar la conversión de números a letras
    return numero.toString();
  }
}
