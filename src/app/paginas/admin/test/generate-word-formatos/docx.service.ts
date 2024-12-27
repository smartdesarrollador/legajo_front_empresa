import { Injectable } from '@angular/core';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
} from 'docx';

@Injectable({
  providedIn: 'root',
})
export class DocxService {
  generateStyledDocument(): void {
    // Crear un encabezado
    const header = new Paragraph({
      text: 'Ejemplo de Documento Word',
      heading: 'Heading1',
      alignment: AlignmentType.CENTER,
    });

    // Párrafo con varios estilos
    const styledParagraph = new Paragraph({
      children: [
        new TextRun({
          text: 'Texto normal. ',
          font: 'Arial',
        }),
        new TextRun({
          text: 'Texto en negrita. ',
          bold: true,
        }),
        new TextRun({
          text: 'Texto en cursiva. ',
          italics: true,
        }),
        new TextRun({
          text: 'Texto subrayado. ',
          underline: {},
        }),
        new TextRun({
          text: 'Texto en color rojo.',
          color: 'FF0000',
        }),
      ],
    });

    // Crear una lista numerada
    const numberedList = [
      new Paragraph({
        text: 'Primer elemento de la lista.',
        numbering: { reference: 'my-numbering', level: 0 },
      }),
      new Paragraph({
        text: 'Segundo elemento de la lista.',
        numbering: { reference: 'my-numbering', level: 0 },
      }),
    ];

    // Crear una tabla
    const table = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Encabezado 1')],
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1 },
                bottom: { style: BorderStyle.SINGLE, size: 1 },
                left: { style: BorderStyle.SINGLE, size: 1 },
                right: { style: BorderStyle.SINGLE, size: 1 },
              },
            }),
            new TableCell({
              children: [new Paragraph('Encabezado 2')],
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1 },
                bottom: { style: BorderStyle.SINGLE, size: 1 },
                left: { style: BorderStyle.SINGLE, size: 1 },
                right: { style: BorderStyle.SINGLE, size: 1 },
              },
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('Celda 1')] }),
            new TableCell({ children: [new Paragraph('Celda 2')] }),
          ],
        }),
      ],
    });

    // Crear el documento
    const doc = new Document({
      numbering: {
        config: [
          {
            reference: 'my-numbering',
            levels: [
              {
                level: 0,
                format: 'decimal',
                text: '%1.',
                alignment: AlignmentType.START,
              },
            ],
          },
        ],
      },
      sections: [
        {
          children: [header, styledParagraph, ...numberedList, table],
        },
      ],
    });

    // Generar y descargar el archivo
    Packer.toBlob(doc).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'documento_avanzado.docx';
      a.click();
    });
  }
}
