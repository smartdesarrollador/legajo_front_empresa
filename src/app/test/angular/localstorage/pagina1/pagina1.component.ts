import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.component.html',
  styleUrls: ['./pagina1.component.css']
})
export class Pagina1Component {
  // Datos que deseas almacenar en el localStorage
  datosParaAlmacenar: any = { nombre: 'Ejemplo', edad: 25 };

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('misDatos', JSON.stringify(this.datosParaAlmacenar));
  }



  // Función para almacenar datos en el localStorage
  /* guardarDatosEnLocalStorage() {
    localStorage.setItem('misDatos', JSON.stringify(this.datosParaAlmacenar));
  } */
}
