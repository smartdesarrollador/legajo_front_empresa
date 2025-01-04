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

export function contratoReconversionEmpresarialDocx(
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
          text: 'Conste por el presente documento, el Contrato Individual de Trabajo a plazo determinado por reconversión empresarial que celebran, de conformidad con lo establecido por artículo 59 del Texto Único Ordenado del Decreto Legislativo 728 – Ley de Productividad y Competitividad Laboral aprobado por el Decreto Supremo N.º 003-97-TR, de una parte,\n\n',
        }),
      ],
    });

    // Datos del empleador y trabajador
    const datosPartes = [
      new Paragraph({
        children: [
          new TextRun(
            'EL EMPLEADOR es una persona jurídica constituida bajo las leyes de la República de Perú que corre inscrita en la Partida Electrónica Nº '
          ),
          new TextRun({
            text: registroEmpleador.numero_partida_registral,
            bold: true,
          }),
          new TextRun(' Asiento '),
          new TextRun({
            text: registroEmpleador.numero_asiento,
            bold: true,
          }),
          new TextRun(
            ' del Registro de Personas Jurídicas de la Oficina Registral de '
          ),
          new TextRun({
            text: registroEmpleador.oficina_registral,
            bold: true,
          }),
          new TextRun('.\n\n'),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun('EL EMPLEADOR es una empresa dedicada a '),
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
          new TextRun(' toda vez que ________ debido a '),
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

    // Cláusulas
    const clausulas = [
      // Objeto del contrato
      new Paragraph({
        text: `CLÁUSULA ${num_valores[1]}. - OBJETO DEL CONTRATO`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun(
            'Por medio del presente contrato, y al amparo de la legislación laboral vigente, EL EMPLEADOR contrata los servicios personales de EL TRABAJADOR para que se desempeñe en el cargo de '
          ),
          new TextRun({ text: datosLocales.oferta_laboral, bold: true }),
          new TextRun(
            ', bajo la modalidad de contrato por reconversión empresarial.\n\n'
          ),
        ],
      }),
    ];

    // Cláusulas condicionales
    if (datosLocales.trabajador_confianza) {
      clausulas.push(
        new Paragraph({
          text: `CLÁUSULA ${num_valores[5]}. - PERSONAL DE CONFIANZA`,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 200 },
        }),
        new Paragraph({
          text: 'En virtud del artículo 43 del Decreto Legislativo N° 728, se considera trabajadores de confianza a aquellos que laboran en contacto personal y directo con EL EMPLEADOR o con el personal de dirección, teniendo acceso a secretos industriales, comerciales o profesionales y, en general, a información de carácter reservado. Asimismo, a los que contribuyen a la formación de decisiones empresariales.\n\n',
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
    console.error('Error en contratoReconversionEmpresarialDocx:', error);
    throw error;
  }
}
