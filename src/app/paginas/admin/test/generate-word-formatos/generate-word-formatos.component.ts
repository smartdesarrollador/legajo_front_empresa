import { Component } from '@angular/core';
import { DocxService } from './docx.service';

@Component({
  selector: 'app-generate-word-formatos',
  templateUrl: './generate-word-formatos.component.html',
  styleUrls: ['./generate-word-formatos.component.css'],
})
export class GenerateWordFormatosComponent {
  constructor(private docxService: DocxService) {}

  downloadStyledDocument() {
    this.docxService.generateStyledDocument();
  }
}
