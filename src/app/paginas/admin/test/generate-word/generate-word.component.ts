import { Component } from '@angular/core';
import { DocxService } from './docx.service';

@Component({
  selector: 'app-generate-word',
  templateUrl: './generate-word.component.html',
  styleUrls: ['./generate-word.component.css'],
})
export class GenerateWordComponent {
  constructor(private docxService: DocxService) {}

  downloadDocument() {
    this.docxService.generateDocument();
  }
}
