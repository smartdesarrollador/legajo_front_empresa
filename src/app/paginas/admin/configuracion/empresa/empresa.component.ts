import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  NgModel,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
/* import { Empleador } from 'src/app/interface/empleador'; */
import { Empleador } from 'src/app/interface/empleador';
import { EmpleadorService } from 'src/app/services/empleador.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  empleador?: Empleador;
  userId: number | null = null;

  constructor(
    private empleadorService: EmpleadorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserIdFromToken();

    if (this.userId !== null) {
      this.empleadorService.getEmpleadorByIdUser(this.userId).subscribe(
        (data: Empleador) => {
          this.empleador = data;
          console.log('Empleador obtenido:', this.empleador);
        },
        (error) => {
          console.error('Error al obtener el empleador:', error);
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario.');
    }
  }

  getUserIdFromToken(): void {
    const token = localStorage.getItem('token_empresa');

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userId = Number(
          decodedToken.id || decodedToken.sub || decodedToken.user_id
        );
        console.log('ID del usuario:', this.userId);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('No se encontró el token');
    }
  }

  editarEmpleador(idEmpleador?: number): void {
    if (idEmpleador !== undefined) {
      this.router.navigate([
        '/admin/configuracion/editar-empleador',
        idEmpleador,
      ]);
    } else {
      console.error('El ID del empleador es inválido.');
    }
  }
}
