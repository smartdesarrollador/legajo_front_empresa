import { dateFunctions } from 'src/app/utils/dateFunctions';
import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  PageBreak,
  BorderStyle,
  convertInchesToTwip,
  IStylesOptions,
} from 'docx';

interface TrabajadorAdaptado {
  primer_nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  numero_documento: string;
  direccion: string;
  area?: string;
  cargo?: string;
  funciones?: string;
}

interface EmpleadorAdaptado {
  empleador: string;
  ruc: string;
  domicilio: string;
  representante_legal: string;
  actividad_economica: string;
  numero_partida_registral: string;
  numero_asiento: string;
  oficina_registral: string;
  dni_representante_legal: string;
  cargo_representante_legal: string;
}

export function contratoInicioActividadDocx(
  registroTrabajador: TrabajadorAdaptado,
  registroEmpleador: EmpleadorAdaptado,
  datosLocales: {
    modelo_contrato: string;
    fecha_inicio: string;
    fecha_fin: string;
    fecha_renovacion: string;
    oferta_laboral: string;
    remuneracion: number;
    horario_inicio: string;
    horario_final: string;
    dia_inicio: string;
    dia_final: string;
    motivo_contrato: string;
    evidencia_documentaria: string;
    trabajador_confianza?: boolean;
    trabajador_direccion?: boolean;
    fiscalizacion_inmediata?: boolean;
    jornada_maxima?: boolean;
    prevencion_covid?: boolean;
    obligaciones_compromisos?: boolean;
    confidencialidad?: boolean;
    propiedad_intelectual?: boolean;
    tecnologia_informacion?: boolean;
    exclusividad?: boolean;
    proteccion_datos?: boolean;
  },
  prueba_meses: string,
  prueba_inicio: string,
  prueba_termino: string,
  fechaFormateada: string,
  num_valores: Array<string>,
  fechaActualValor: string,
  convertirFormatoFecha: dateFunctions
): Document {
  try {
    console.log('Datos recibidos en contratoInicioActividadDocx:', {
      registroTrabajador,
      registroEmpleador,
      datosLocales,
      prueba_meses,
      prueba_inicio,
      prueba_termino,
    });

    // Título
    const titulo = new Paragraph({
      text: datosLocales.modelo_contrato || 'CONTRATO DE TRABAJO',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 200 },
    });

    // Datos del trabajador
    const nombreCompletoTrabajador = [
      registroTrabajador.primer_nombre,
      registroTrabajador.segundo_nombre,
      registroTrabajador.apellido_paterno,
      registroTrabajador.apellido_materno,
    ]
      .filter(Boolean)
      .join(' ');

    const datosTrabajador = new Paragraph({
      children: [
        new TextRun({ text: nombreCompletoTrabajador, bold: true }),
        new TextRun({ text: ' identificado con DNI Nº ' }),
        new TextRun({ text: registroTrabajador.numero_documento, bold: true }),
        new TextRun({ text: ', con domicilio en ' }),
        new TextRun({ text: registroTrabajador.direccion, bold: true }),
        new TextRun({
          text: ', a quien en adelante se le denominará EL TRABAJADOR.\n\n',
        }),
      ],
      spacing: { after: 200 },
    });

    // Datos del empleador
    const datosEmpleador = new Paragraph({
      children: [
        new TextRun({ text: registroEmpleador.empleador, bold: true }),
        new TextRun({ text: ', identificado con RUC Nº ' }),
        new TextRun({ text: registroEmpleador.ruc, bold: true }),
        new TextRun({ text: ', con domicilio en ' }),
        new TextRun({ text: registroEmpleador.domicilio, bold: true }),
        new TextRun({ text: ', Lima, debidamente representada por ' }),
        new TextRun({
          text: registroEmpleador.representante_legal,
          bold: true,
        }),
      ],
      spacing: { after: 200 },
    });

    // ... resto del código existente ...

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            titulo,
            datosEmpleador,
            datosTrabajador,
            // ... resto de elementos
          ],
        },
      ],
      styles: {
        paragraphStyles: [
          {
            id: 'normal',
            name: 'Normal',
            basedOn: 'Normal',
            next: 'Normal',
            quickFormat: true,
            run: {
              size: 24,
              font: 'Arial',
            },
            paragraph: {
              spacing: {
                line: 360,
                before: 0,
                after: 0,
              },
            },
          },
        ],
      },
    });

    return doc;
  } catch (error) {
    console.error('Error en contratoInicioActividadDocx:', error);
    throw error;
  }
}
