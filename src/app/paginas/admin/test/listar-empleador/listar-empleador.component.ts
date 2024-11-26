import { Component, OnInit } from '@angular/core';
/* import { EmpleadorService } from './empleador.service';
import { Empleador } from './empleador.interface'; */

import { Empleador } from 'src/app/interface/interface/registro-empleador';
import { RegistroEmpleadorService } from 'src/app/services/services/registro-empleador.service';

@Component({
  selector: 'app-listar-empleador',
  templateUrl: './listar-empleador.component.html',
  styleUrls: ['./listar-empleador.component.css'],
})
export class ListarEmpleadorComponent implements OnInit {
  empleador: Empleador | null = null;
  error: string = '';
  loading: boolean = false;

  constructor(private empleadorService: RegistroEmpleadorService) {}

  ngOnInit(): void {
    // Ejemplo de carga de datos para un usuario específico
    this.loadEmpleador(2); // Puedes cambiar el ID según necesites
  }

  loadEmpleador(userId: number): void {
    this.loading = true;
    this.empleadorService.getEmpleadorByUserId(userId).subscribe({
      next: (data) => {
        this.empleador = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar los datos del empleador';
        this.loading = false;
        console.error('Error:', error);
      },
    });
  }
}
