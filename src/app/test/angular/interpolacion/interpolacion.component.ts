import { Component } from '@angular/core';
import { Persona } from '../../../persona';

@Component({
  selector: 'app-interpolacion',
  templateUrl: './interpolacion.component.html',
  styleUrls: ['./interpolacion.component.css']
})
export class InterpolacionComponent {

  nombre:string = 'Fernando';
  persona:Persona =  {
    nombre: 'David',
    edad: 35
  }

}

