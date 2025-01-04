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

export function contratoPorSuplenciaDocx(
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
    fecha_suplencia: string;
    genero_suplencia: string;
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
          text: 'Conste por el presente documento, el Contrato de Trabajo de Naturaleza Accidental bajo la modalidad de Suplencia, al amparo del art. 61º del TUO del Decreto Legislativo 728, Ley de productividad y competitividad laboral, aprobado por D.S. Nº 003-97-TR, y normas complementarias, que celebran, de una parte,\n\n',
        }),
      ],
    });

    // Datos del empleador y trabajador
    const datosPartes = [
      new Paragraph({
        children: [
          new TextRun(
            'EL EMPLEADOR es una sociedad constituida y existente bajo las leyes del Perú, cuyo objeto social es dedicarse a '
          ),
          new TextRun({
            text: registroEmpleador.actividad_economica,
            bold: true,
          }),
          new TextRun('.\n\n'),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun('Por su parte, EL TRABAJADOR declara ser '),
          new TextRun({
            text: datosLocales.oferta_laboral,
            bold: true,
          }),
          new TextRun(
            ' de profesión, y contar con la capacidad y experiencia necesaria para desempeñar el cargo ofrecido.\n\n'
          ),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun('Con fecha '),
          new TextRun({
            text: datosLocales.fecha_inicio,
            bold: true,
          }),
          new TextRun(', EL EMPLEADOR contrató a '),
          new TextRun({
            text: `${registroTrabajador.primer_nombre} ${registroTrabajador.segundo_nombre} ${registroTrabajador.apellido_paterno} ${registroTrabajador.apellido_materno}`,
            bold: true,
          }),
          new TextRun(
            datosLocales.genero_suplencia === 'femenino'
              ? ' (en adelante, "LA TRABAJADORA SUPLIDA"), identificada con DNI N° '
              : ' (en adelante, "EL TRABAJADOR SUPLIDO"), identificado con DNI N° '
          ),
          new TextRun({
            text: registroTrabajador.numero_documento,
            bold: true,
          }),
          new TextRun(', en el cargo de '),
          new TextRun({
            text: datosLocales.oferta_laboral,
            bold: true,
          }),
          new TextRun('.\n\n'),
        ],
      }),
    ];

    // Cláusulas
    const clausulas = [
      // Periodo de prueba
      new Paragraph({
        text: `CLÁUSULA ${num_valores[13]}. - PERIODO DE PRUEBA`,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun(
            'En atención al artículo 10 del Texto Único Ordenado del Decreto Legislativo N° 728 – Ley de Productividad y Competitividad Laboral aprobado por el Decreto Supremo N.º 003-97-TR, el período de prueba es de '
          ),
          new TextRun({ text: prueba_meses, bold: true }),
          new TextRun(', el cual empieza el '),
          new TextRun({ text: prueba_inicio, bold: true }),
          new TextRun(' y termina el '),
          new TextRun({ text: prueba_termino, bold: true }),
          new TextRun(
            '. Queda entendido que durante este periodo de prueba EL EMPLEADOR puede resolver el contrato sin expresión de causa.\n\n'
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
    console.error('Error en contratoPorSuplenciaDocx:', error);
    throw error;
  }
}
