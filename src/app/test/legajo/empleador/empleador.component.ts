import { Component, OnInit } from '@angular/core';
import { EmpleadorService } from './empleador.service';
import { Empleador } from 'src/app/interface/empleador';

@Component({
  selector: 'app-empleador',
  templateUrl: './empleador.component.html',
  styleUrls: ['./empleador.component.css'],
})
export class EmpleadorComponent implements OnInit {
  empleadores: Empleador[] = [];

  constructor(private empleadorService: EmpleadorService) {}

  ngOnInit(): void {
    this.empleadorService.getEmpleadores().subscribe(
      (data: Empleador[]) => {
        this.empleadores = data;
      },
      (error) => {
        console.error('Error al obtener los empleadores', error);
      }
    );
  }
}
