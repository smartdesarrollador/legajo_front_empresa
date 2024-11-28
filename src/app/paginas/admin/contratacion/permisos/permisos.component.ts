import { Component, OnInit } from '@angular/core';
import { PermisoService } from 'src/app/services/permiso.service';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Permisos } from 'src/app/interface/permisos';
import { FiltroPermisos } from 'src/app/interface/filtro-permisos';
import { Trabajador } from 'src/app/interface/trabajador';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css'],
})
export class PermisosComponent implements OnInit {
  permisos: Permisos[] = [];
  trabajadores: Trabajador[] = [];
  filtros: FiltroPermisos = {};
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private permisosService: PermisoService,
    private trabajadoresService: TrabajadorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarTrabajadores();
    this.buscarPermisos();
  }

  /**
   * Busca los permisos aplicando los filtros seleccionados.
   */
  buscarPermisos(): void {
    this.loading = true;
    this.errorMessage = null;

    this.permisosService.getPermisos(this.filtros).subscribe({
      next: (data) => {
        this.permisos = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          'Error al obtener permisos, por favor intenta de nuevo.';
        console.error('Error al obtener permisos:', error);
        this.loading = false;
      },
    });
  }

  /**
   * Carga la lista de trabajadores para el filtro.
   */
  cargarTrabajadores(): void {
    this.trabajadoresService.getTrabajadores().subscribe({
      next: (data) => {
        this.trabajadores = data;
      },
      error: (error) => {
        console.error('Error al cargar trabajadores:', error);
        this.errorMessage = 'Error al cargar la lista de trabajadores.';
      },
    });
  }

  /**
   * Navega a la página de edición del permiso
   * @param idPermiso ID del permiso a editar
   */
  verPermiso(idPermiso: number): void {
    this.router.navigate(['/admin/gestion/permisos/editar', idPermiso]);
  }
}
