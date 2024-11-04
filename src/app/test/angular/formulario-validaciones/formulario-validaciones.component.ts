import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario-validaciones',
  templateUrl: './formulario-validaciones.component.html',
  styleUrls: ['./formulario-validaciones.component.css'],
})
export class FormularioValidacionesComponent {
  persona = {
    nombre: '',
    edad: '',
  };

  procesar() {
    console.log(this.persona);
  }
}
