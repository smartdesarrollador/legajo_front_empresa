import { Injectable } from '@angular/core';
import { Document, Packer, Paragraph, TextRun } from 'docx';

@Injectable({
  providedIn: 'root',
})
export class DocxService {
  generateDocument(): void {
    // Crea el contenido del documento
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun(
                  'Hola, este es un ejemplo de texto en un documento Word.'
                ),
                new TextRun({
                  text: 'Este es texto en negrita.',
                  bold: true,
                }),
              ],
            }),
          ],
        },
      ],
    });

    // Empaqueta y guarda el documento
    Packer.toBlob(doc).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ejemplo.docx';
      a.click();
    });
  }
}
