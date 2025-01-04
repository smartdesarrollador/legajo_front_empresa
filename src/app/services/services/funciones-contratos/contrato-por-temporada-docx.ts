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
  domiciliado: string;
  numero_partida_registral: string;
  numero_asiento: string;
  oficina_registral: string;
  dni_representante_legal: string;
  cargo_representante_legal: string;
}

export function contratoPorTemporadaDocx(
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
    objeto_contrato_temporada: string;
    motivo_contrato_temporada: string;
    evidencia_contrato_temporada: string;
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
    duracion_contrato: string;
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
          text: 'Conste por el presente documento, el Contrato Individual de Trabajo bajo la modalidad de "Contrato de Temporada", de conformidad con lo establecido por artículo 67 del Texto Único Ordenado del Decreto Legislativo 728 – Ley de Productividad y Competitividad Laboral aprobado por el Decreto Supremo N.º 003-97-TR, de una parte,\n\n',
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

    // Cláusulas
    const clausulas = [
      // Duración del contrato
      new Paragraph({
        text: `CLÁUSULA ${num_valores[9]}. - DURACIÓN DEL CONTRATO`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun('El plazo de duración del presente contrato es de '),
          new TextRun({ text: datosLocales.duracion_contrato, bold: true }),
          new TextRun(', y rige desde el '),
          new TextRun({ text: formatoFechaInicio, bold: true }),
          new TextRun(
            ', fecha en que debe empezar sus labores EL TRABAJADOR, hasta el '
          ),
          new TextRun({ text: formatoFechaRenovacion, bold: true }),
          new TextRun(', fecha en que termina el contrato.\n\n'),
        ],
      }),
    ];

    // Cláusulas condicionales
    if (datosLocales.exclusividad) {
      clausulas.push(
        new Paragraph({
          text: `CLÁUSULA ${num_valores[14]}. - EXCLUSIVIDAD`,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 200 },
        }),
        new Paragraph({
          text: 'EL TRABAJADOR se obliga por su parte en forma expresa a prestar servicios a EL EMPLEADOR bajo condición de exclusividad, dependencia y lealtad de acuerdo con los reglamentos, prácticas y políticas establecidas por EL EMPLEADOR. En ese sentido, EL TRABAJADOR no podrá prestar servicios paralelos a empresas que se dediquen al mismo rubro que EL EMPLEADOR o brindar servicios similares al de EL EMPLEADOR por su cuenta.\n\n',
        })
      );
    }

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
            ...clausulas,
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
    console.error('Error en contratoPorTemporadaDocx:', error);
    throw error;
  }
}
