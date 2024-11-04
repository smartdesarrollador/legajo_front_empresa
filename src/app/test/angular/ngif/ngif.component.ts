import { Component } from '@angular/core';

@Component({
  selector: 'app-ngif',
  templateUrl: './ngif.component.html',
  styleUrls: ['./ngif.component.css'],
})
export class NgifComponent {
  openAlert: boolean = false;
  mostrar_en_consola(name: string) {
    console.log(name);

    this.openAlert = true;
  }
}
