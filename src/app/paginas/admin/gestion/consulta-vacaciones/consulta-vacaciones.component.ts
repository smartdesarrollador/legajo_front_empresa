import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsultaVacacionesService } from 'src/app/services/consulta-vacaciones.service';
import { firstValueFrom } from 'rxjs';
import {
  Vacaciones,
  TipoVacaciones,
  Trabajador,
} from 'src/app/interface/consulta_vacaciones_trabajadores.interface';

@Component({
  selector: 'app-consulta-vacaciones',
  templateUrl: './consulta-vacaciones.component.html',
  styleUrls: ['./consulta-vacaciones.component.css'],
})
export class ConsultaVacacionesComponent implements OnInit {
  consultaForm: FormGroup;
  vacaciones: Vacaciones[] = [];
  tiposVacaciones: TipoVacaciones[] = [];
  trabajadores: Trabajador[] = [];
  loading = false;
  dataLoaded = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private consultaVacacionesService: ConsultaVacacionesService
  ) {
    this.consultaForm = this.fb.group({
      id_tipo_vacaciones: [null],
      id_trabajador: [null],
      fecha_desde: [''],
      fecha_hasta: [''],
    });
  }

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.cargarVacaciones();
  }

  async cargarDatosIniciales(): Promise<void> {
    try {
      this.loading = true;
      const [tipos, trabajadores] = await Promise.all([
        firstValueFrom(this.consultaVacacionesService.getTiposVacaciones()),
        firstValueFrom(this.consultaVacacionesService.getTrabajadores()),
      ]);

      this.tiposVacaciones = tipos || [];
      this.trabajadores = trabajadores || [];
      this.dataLoaded = true;
    } catch (error) {
      console.error('Error al cargar datos iniciales:', error);
      this.error = 'Error al cargar los datos iniciales';
    } finally {
      this.loading = false;
    }
  }

  cargarVacaciones(): void {
    this.loading = true;
    this.error = null;
    const userId = localStorage.getItem('id_user');

    if (!userId) {
      this.error = 'No se encontró id_user en localStorage';
      this.loading = false;
      return;
    }

    this.consultaVacacionesService
      .consultarVacaciones({ id_user: parseInt(userId) })
      .subscribe({
        next: (data) => {
          this.vacaciones = data || [];
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al consultar vacaciones:', error);
          this.error = error.error?.error || 'Error al consultar vacaciones';
          this.loading = false;
          this.vacaciones = [];
        },
      });
  }

  onSubmit(): void {
    if (this.consultaForm.valid) {
      this.loading = true;
      this.error = null;
      const userId = localStorage.getItem('id_user');

      if (!userId) {
        this.error = 'No se encontró id_user en localStorage';
        this.loading = false;
        return;
      }

      this.consultaVacacionesService
        .consultarVacaciones({
          ...this.consultaForm.value,
          id_user: parseInt(userId),
        })
        .subscribe({
          next: (data) => {
            this.vacaciones = data || [];
            this.loading = false;
          },
          error: (error) => {
            console.error('Error al consultar vacaciones:', error);
            this.error = error.error?.error || 'Error al consultar vacaciones';
            this.loading = false;
            this.vacaciones = [];
          },
        });
    }
  }

  getSaldoAcumulado(): number {
    if (!this.vacaciones.length || !this.vacaciones[0]?.saldo_vacaciones) {
      return 0;
    }
    return this.vacaciones[0].saldo_vacaciones.dias_acumulados;
  }

  getSaldoTomado(): number {
    if (!this.vacaciones.length || !this.vacaciones[0]?.saldo_vacaciones) {
      return 0;
    }
    return this.vacaciones[0].saldo_vacaciones.dias_usados;
  }

  getSaldoRestante(): number {
    if (!this.vacaciones.length || !this.vacaciones[0]?.saldo_vacaciones) {
      return 0;
    }
    return this.vacaciones[0].saldo_vacaciones.saldo_actual;
  }

  aprobarVacaciones(id: number): void {
    // Implementar lógica de aprobación
    console.log('Aprobar vacaciones:', id);
  }

  desaprobarVacaciones(id: number): void {
    // Implementar lógica de desaprobación
    console.log('Desaprobar vacaciones:', id);
  }
}
