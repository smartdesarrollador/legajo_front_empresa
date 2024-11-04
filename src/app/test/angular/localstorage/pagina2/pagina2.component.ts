import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.css']
})
export class Pagina2Component {
  // Variable para almacenar los datos recuperados del localStorage
  datosRecuperados: any;

  constructor() {
    // Recuperar datos del localStorage al inicializar el componente
    const datosGuardados = localStorage.getItem('misDatos');
    if (datosGuardados) {
      this.datosRecuperados = JSON.parse(datosGuardados);
    }
  }
}
