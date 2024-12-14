import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarLicenciaService } from '../../../../../services/services/editar-licencia.service';

@Component({
  selector: 'app-editar-licencia',
  templateUrl: './editar-licencia.component.html',
})
export class EditarLicenciaComponent implements OnInit {
  editarForm: FormGroup;
  licenciaId!: number;
  userId = Number(localStorage.getItem('id_user')) || 0;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private editarLicenciaService: EditarLicenciaService
  ) {
    this.editarForm = this.fb.group(
      {
        fecha_emision: ['', [Validators.required]],
        fecha_inicio: ['', [Validators.required]],
        fecha_fin: ['', [Validators.required]],
        motivo: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(500),
          ],
        ],
        goce_haber: ['', [Validators.required]],
        id_area: ['', [Validators.required]],
        id_trabajador: ['', [Validators.required]],
        id_estado_permiso: ['', [Validators.required]],
        jefe_vacaciones: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(200),
          ],
        ],
      },
      {
        validators: this.fechaFinValidator,
      }
    );
  }

  // Validador personalizado para fecha_fin
  fechaFinValidator(group: FormGroup) {
    const inicio = group.get('fecha_inicio')?.value;
    const fin = group.get('fecha_fin')?.value;

    if (inicio && fin && new Date(fin) < new Date(inicio)) {
      return { fechaFinInvalida: true };
    }
    return null;
  }

  // Getter para fácil acceso a los campos del form
  get f() {
    return this.editarForm.controls;
  }

  ngOnInit(): void {
    this.licenciaId = this.route.snapshot.params['id'];
    this.cargarLicencia();
  }

  cargarLicencia(): void {
    this.editarLicenciaService.obtenerLicencia(this.licenciaId).subscribe({
      next: (response) => {
        if (response.success) {
          this.editarForm.patchValue({
            fecha_emision: response.data.fecha_emision,
            fecha_inicio: response.data.fecha_inicio,
            fecha_fin: response.data.fecha_fin,
            motivo: response.data.motivo,
            goce_haber: response.data.goce_haber,
            id_area: response.data.id_area,
            id_trabajador: response.data.id_trabajador,
            id_estado_permiso: response.data.id_estado_permiso,
            jefe_vacaciones: response.data.jefe_vacaciones,
          });
        }
      },
      error: (error) => {
        console.error('Error al cargar la licencia:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      },
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editarForm.invalid) {
      return;
    }

    const formData = {
      ...this.editarForm.value,
      id_area: 1,
      id_trabajador: 1,
      id_estado_permiso: 1,
    };

    this.editarLicenciaService
      .editarLicencia(this.licenciaId, formData)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/admin/gestion/consulta-licencias']);
          }
        },
        error: (error) => {
          console.error('Error al actualizar la licencia:', error);
        },
      });
  }

  // Métodos helper para validación en el template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.editarForm.get(fieldName);
    return field
      ? field.invalid && (field.dirty || field.touched || this.submitted)
      : false;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.editarForm.get(fieldName);

    if (control?.errors) {
      if (control.errors['required']) {
        return 'Este campo es requerido';
      }
      if (control.errors['minlength']) {
        return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors['maxlength']) {
        return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
      }
      if (control.errors['fechaFinInvalida']) {
        return 'La fecha de fin debe ser posterior a la fecha de inicio';
      }
    }
    return '';
  }

  volver(): void {
    this.router.navigate(['/admin/gestion/consulta-licencias']);
  }
}
