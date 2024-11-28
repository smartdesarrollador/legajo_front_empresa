import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermisoService } from 'src/app/services/permiso.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-editar-permiso',
  templateUrl: './editar-permiso.component.html',
  styleUrls: ['./editar-permiso.component.css'],
})
export class EditarPermisoComponent implements OnInit {
  permisoForm: FormGroup;
  id: number = 0;
  loading: boolean = false;
  areas: any[] = [];
  trabajadores: any[] = [];
  estadosPermiso: any[] = [];

  constructor(
    private fb: FormBuilder,
    private permisosService: PermisoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.permisoForm = this.fb.group({
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      horas: ['', [Validators.required, Validators.min(1)]],
      motivo: ['', Validators.required],
      id_area: [''],
      id_trabajador: ['', Validators.required],
      jefe_inmediato: ['', Validators.required],
      id_estado_permiso: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.cargarDatosPermiso();
    });
  }

  cargarDatosIniciales() {
    // Cargar datos necesarios para los selectores
    this.permisosService.getAreas().subscribe((areas) => (this.areas = areas));
    this.permisosService
      .getTrabajadores()
      .subscribe((trabajadores) => (this.trabajadores = trabajadores));
    this.permisosService
      .getEstadosPermiso()
      .subscribe((estados) => (this.estadosPermiso = estados));
  }

  cargarDatosPermiso() {
    if (this.id) {
      this.loading = true;
      this.permisosService
        .getPermisoParaEditar(this.id)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: (permiso) => {
            this.permisoForm.patchValue({
              fecha_inicio: permiso.fecha_inicio,
              fecha_fin: permiso.fecha_fin,
              horas: permiso.horas,
              motivo: permiso.motivo,
              id_area: permiso.id_area,
              id_trabajador: permiso.id_trabajador,
              jefe_inmediato: permiso.jefe_inmediato,
              id_estado_permiso: permiso.id_estado_permiso,
            });
          },
          error: (error) => {
            console.error('Error al cargar el permiso:', error);
            // Aquí podrías mostrar un mensaje de error
          },
        });
    }
  }

  onSubmit() {
    if (this.permisoForm.valid) {
      this.loading = true;
      this.permisosService
        .editarPermiso(this.id, this.permisoForm.value)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe({
          next: (response) => {
            if (response.success) {
              // Mostrar mensaje de éxito
              this.router.navigate(['/permisos']);
            }
          },
          error: (error) => {
            console.error('Error al actualizar:', error);
            // Mostrar mensaje de error
          },
        });
    }
  }

  cancelar(): void {
    this.router.navigate(['/permisos']);
  }
}
