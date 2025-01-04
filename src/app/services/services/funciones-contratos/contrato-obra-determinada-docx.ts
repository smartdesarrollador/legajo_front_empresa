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

export function contratoObraDeterminadaDocx(
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
    proyecto_obra_determinada: string;
    ubicacion_obra_determinada: string;
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
          text: 'Conste mediante el presente documento, suscrito por duplicado con igual valor y tenor, el Contrato Individual de Trabajo por Obra determinada que celebran, de conformidad con lo establecido por el artículo 63 del Texto Único Ordenado del Decreto Legislativo N° 728 – Ley de Productividad y Competitividad Laboral aprobado por el Decreto Supremo Nº 003-97-TR, de una parte,\n\n',
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
      // Objeto del contrato
      new Paragraph({
        text: `CLÁUSULA ${num_valores[1]}. - OBJETO DEL CONTRATO`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun(
            'Por medio del presente contrato, y al amparo de la legislación laboral vigente, EL EMPLEADOR, contrata de forma temporal y bajo la modalidad de obra determinada a EL TRABAJADOR para que desempeñe sus funciones en el puesto de '
          ),
          new TextRun({ text: datosLocales.oferta_laboral, bold: true }),
          new TextRun(
            ' toda vez que se requiere de sus servicios para el proyecto '
          ),
          new TextRun({
            text: datosLocales.proyecto_obra_determinada,
            bold: true,
          }),
          new TextRun(', ubicado en '),
          new TextRun({
            text: datosLocales.ubicacion_obra_determinada,
            bold: true,
          }),
          new TextRun(
            '. En base a dicho proyecto, actualmente se requiere contratar personal por un plazo determinado a fin de cumplir con las obligaciones y condiciones de servicio que fueron pactadas, en tanto se desarrolle el citado servicio para el proyecto bajo comentario.\n\n'
          ),
        ],
      }),
      // Prestación de servicios
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
      // ... Agregar el resto de las cláusulas siguiendo el mismo patrón
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
    console.error('Error en contratoObraDeterminadaDocx:', error);
    throw error;
  }
}
