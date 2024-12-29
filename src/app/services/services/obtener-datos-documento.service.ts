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
            new Paragraph({
              text: 'CONTRATO DE TRABAJO',
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 200,
              },
            }),

            // Datos del Contrato
            new Paragraph({
              children: [
                new TextRun({
                  text: `CONTRATO N° ${datos.contrato.numero}`,
                  bold: true,
                }),
              ],
            }),

            // Datos del Empleador
            new Paragraph({
              children: [
                new TextRun({
                  text: '\nDATOS DEL EMPLEADOR\n',
                  bold: true,
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun(`Razón Social: ${datos.empleador.nombre}\n`),
                new TextRun(`RUC: ${datos.empleador.ruc}\n`),
                new TextRun(`Dirección: ${datos.empleador.direccion}\n`),
                new TextRun(
                  `Representante Legal: ${datos.empleador.representante_legal}\n`
                ),
              ],
            }),

            // Datos del Trabajador
            new Paragraph({
              children: [
                new TextRun({
                  text: '\nDATOS DEL TRABAJADOR\n',
                  bold: true,
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun(`Nombres: ${datos.trabajador.nombres}\n`),
                new TextRun(`Apellidos: ${datos.trabajador.apellidos}\n`),
                new TextRun(`DNI: ${datos.trabajador.dni}\n`),
                new TextRun(`Dirección: ${datos.trabajador.direccion}\n`),
                new TextRun(`Área: ${datos.trabajador.area}\n`),
                new TextRun(`Cargo: ${datos.trabajador.cargo}\n`),
              ],
            }),

            // Detalles del Contrato
            new Paragraph({
              children: [
                new TextRun({
                  text: '\nDETALLES DEL CONTRATO\n',
                  bold: true,
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun(
                  `Tipo de Contrato: ${datos.contrato.tipo_contrato}\n`
                ),
                new TextRun(
                  `Jornada Laboral: ${datos.contrato.jornada_laboral}\n`
                ),
                new TextRun(
                  `Fecha de Inicio: ${datos.contrato.fecha_inicio}\n`
                ),
                new TextRun(
                  `Fecha de Fin: ${datos.contrato.fecha_fin || 'Indefinido'}\n`
                ),
                new TextRun(
                  `Remuneración: S/. ${datos.detalle.remuneracion}\n`
                ),
                new TextRun(
                  `Horario: ${datos.detalle.horario_inicio} - ${datos.detalle.horario_final}\n`
                ),
                new TextRun(
                  `Días: ${datos.detalle.dia_inicio} a ${datos.detalle.dia_final}\n`
                ),
              ],
            }),

            // Condiciones
            new Paragraph({
              children: [
                new TextRun({
                  text: '\nCONDICIONES ESPECIALES\n',
                  bold: true,
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun(
                  `Trabajador de Confianza: ${
                    datos.condiciones.trabajador_confianza ? 'Sí' : 'No'
                  }\n`
                ),
                new TextRun(
                  `Trabajador de Dirección: ${
                    datos.condiciones.trabajador_direccion ? 'Sí' : 'No'
                  }\n`
                ),
                new TextRun(
                  `Fiscalización Inmediata: ${
                    datos.condiciones.fiscalizacion_inmediata ? 'Sí' : 'No'
                  }\n`
                ),
                new TextRun(
                  `Jornada Máxima: ${
                    datos.condiciones.jornada_maxima ? 'Sí' : 'No'
                  }\n`
                ),
              ],
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
}
