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

export function contratoServicioEspecificoDocx(
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
    duracion_contrato: string;
    objeto_servicio_especifico: string;
    nombre_servicio_especifico: string;
    locacion_servicio_especifico: string;
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
          text: 'Conste mediante el presente documento, suscrito por duplicado con igual valor y tenor, el Contrato Individual de Trabajo por servicio específico que celebran, de conformidad con lo establecido por el Texto Único Ordenado del Decreto Legislativo 728 – Ley de Productividad y Competitividad Laboral aprobado por el Decreto Supremo Nº 003-97-TR, de una parte,\n\n',
        }),
      ],
    });

    // Datos del empleador y trabajador
    const datosPartes = [
      new Paragraph({
        children: [
          new TextRun(
            'Por el presente documento, y al amparo de la legislación laboral vigente, EL EMPLEADOR contrata de manera TEMPORAL bajo la modalidad de servicio específico, los servicios de EL TRABAJADOR para que lleve a cabo el servicio específico de '
          ),
          new TextRun({
            text: datosLocales.oferta_laboral,
            bold: true,
          }),
          new TextRun(
            ', toda vez que por su experiencia en el rubro se requiere de sus servicios con el objeto de '
          ),
          new TextRun({
            text: datosLocales.objeto_servicio_especifico,
            bold: true,
          }),
          new TextRun('.\n\n'),
        ],
      }),
    ];

    // Cláusulas
    const clausulas = [
      new Paragraph({
        text: `CLÁUSULA ${num_valores[2]}. - PRESTACIÓN DE SERVICIOS`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun(
            '3.1 EL TRABAJADOR desempeñará sus labores en el cargo de '
          ),
          new TextRun({ text: datosLocales.oferta_laboral, bold: true }),
          new TextRun(
            ' desempeñando las funciones que se señalan en el Anexo 1-A del presente contrato.\n\n'
          ),
        ],
      }),
    ];

    // Anexo 1-A
    const anexo = [
      new Paragraph({
        text: 'ANEXO 1-A',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        text: 'FUNCIONES',
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
      }),
    ];

    // Cláusulas condicionales
    if (datosLocales.propiedad_intelectual) {
      clausulas.push(
        new Paragraph({
          text: `CLÁUSULA ${num_valores[19]}. - PROPIEDAD INTELECTUAL`,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 200 },
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
            ...anexo,
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
    console.error('Error en contratoServicioEspecificoDocx:', error);
    throw error;
  }
}
