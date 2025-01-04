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

export function contratoIncrementoActividadDocx(
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
    const formatoFechaInicio = convertirFormatoFecha.convertirFecha(
      datosLocales.fecha_inicio
    );
    const formatoFechaRenovacion = convertirFormatoFecha.convertirFecha(
      datosLocales.fecha_renovacion
    );

    // Título
    const titulo = new Paragraph({
      text: datosLocales.modelo_contrato,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
    });

    // Introducción
    const introduccion = new Paragraph({
      children: [
        new TextRun({
          text: 'Conste mediante el presente documento, suscrito por duplicado con igual valor y tenor, el Contrato Individual de Trabajo por incremento de actividad que celebran, de conformidad con lo establecido por el Texto Único Ordenado del Decreto Legislativo N° 728 – Ley de Productividad y Competitividad Laboral aprobado por el Decreto Supremo N° 003-97-TR, de una parte,\n\n',
        }),
      ],
    });

    // Datos del empleador y trabajador
    const datosPartes = [
      new Paragraph({
        children: [
          new TextRun({ text: registroEmpleador.empleador, bold: true }),
          new TextRun({ text: ', identificado con RUC Nº ' }),
          new TextRun({ text: registroEmpleador.ruc, bold: true }),
          new TextRun({ text: ', con domicilio en ' }),
          new TextRun({ text: registroEmpleador.domicilio, bold: true }),
          new TextRun({ text: ', debidamente representado por ' }),
          new TextRun({
            text: registroEmpleador.representante_legal,
            bold: true,
          }),
          new TextRun({
            text: ', a quien en adelante se le denominará EL EMPLEADOR, y de la otra parte,\n\n',
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${registroTrabajador.primer_nombre} ${registroTrabajador.segundo_nombre} ${registroTrabajador.apellido_paterno} ${registroTrabajador.apellido_materno}`,
            bold: true,
          }),
          new TextRun({ text: ', identificado con DNI Nº ' }),
          new TextRun({
            text: registroTrabajador.numero_documento,
            bold: true,
          }),
          new TextRun({ text: ', con domicilio en ' }),
          new TextRun({ text: registroTrabajador.direccion, bold: true }),
          new TextRun({
            text: ', a quien en adelante se le denominará EL TRABAJADOR.\n\n',
          }),
        ],
      }),
    ];

    // Antecedentes
    const antecedentes = [
      new Paragraph({
        text: `CLÁUSULA ${num_valores[0]}. - ANTECEDENTES`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun('1.1. EL EMPLEADOR es una empresa dedicada a '),
          new TextRun({
            text: registroEmpleador.actividad_economica,
            bold: true,
          }),
          new TextRun(
            ', la cual requiere cubrir las necesidades de recursos humanos de manera temporal, por lo cual requiere contratar a una persona para que desempeñe el cargo de '
          ),
          new TextRun({
            text: datosLocales.oferta_laboral,
            bold: true,
          }),
          new TextRun(
            ' toda vez que se ha dado un incremento sustancial de las actividades de la compañía debido a '
          ),
          new TextRun({
            text: datosLocales.motivo_contrato,
            bold: true,
          }),
          new TextRun(', lo cual queda evidenciado en documentos como: '),
          new TextRun({
            text: datosLocales.evidencia_documentaria,
            bold: true,
          }),
          new TextRun('.\n\n'),
        ],
      }),
    ];

    // Objeto del Contrato
    const objetoContrato = [
      new Paragraph({
        text: `CLÁUSULA ${num_valores[1]}. - OBJETO DEL CONTRATO`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 },
      }),
      // ... Agregar el contenido del objeto del contrato
    ];

    // Agregar el resto de las cláusulas siguiendo el mismo patrón

    // Tabla de firmas
    const tablaFirmas = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('______________________________')],
              width: { size: 50, type: WidthType.PERCENTAGE },
            }),
            new TableCell({
              children: [new Paragraph('______________________________')],
              width: { size: 50, type: WidthType.PERCENTAGE },
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('EL EMPLEADOR')],
              width: { size: 50, type: WidthType.PERCENTAGE },
            }),
            new TableCell({
              children: [new Paragraph('EL TRABAJADOR')],
              width: { size: 50, type: WidthType.PERCENTAGE },
            }),
          ],
        }),
      ],
    });

    // Crear documento
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            titulo,
            introduccion,
            ...datosPartes,
            ...antecedentes,
            ...objetoContrato,
            // Agregar el resto de las secciones
            tablaFirmas,
          ],
        },
      ],
      styles: {
        paragraphStyles: [
          {
            id: 'normal',
            name: 'Normal',
            run: {
              size: 24,
              font: 'Arial',
            },
            paragraph: {
              spacing: { line: 360 },
            },
          },
        ],
      },
    });

    return doc;
  } catch (error) {
    console.error('Error en contratoIncrementoActividadDocx:', error);
    throw error;
  }
}
