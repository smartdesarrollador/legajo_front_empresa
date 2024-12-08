import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConsultaLicenciasService } from '../../../../../services/services/consulta-licencias.service';
import {
  Licencia,
  SelectOption,
} from '../../../../../interface/interface/consulta_licencias_trabajadores';

@Component({
  selector: 'app-consulta-licencias',
  templateUrl: './consulta-licencias.component.html',
  styleUrls: ['./consulta-licencias.component.css'],
})
export class ConsultaLicenciasComponent implements OnInit {
  consultaForm: FormGroup;
  areas: SelectOption[] = [];
  trabajadores: SelectOption[] = [];
  licencias: Licencia[] = [];
  userId = Number(localStorage.getItem('id_user')) || 0;

  constructor(
    private fb: FormBuilder,
    private consultaLicenciasService: ConsultaLicenciasService
  ) {
    this.consultaForm = this.fb.group({
      fecha_desde: [''],
      fecha_hasta: [''],
      id_area: [''],
      id_trabajador: [''],
    });
  }

  ngOnInit(): void {
    this.cargarSelects();
    this.cargarLicencias();
  }

  cargarSelects(): void {
    this.consultaLicenciasService
      .obtenerAreas(this.userId)
      .subscribe((areas) => (this.areas = areas));

    this.consultaLicenciasService
      .obtenerTrabajadores(this.userId)
      .subscribe((trabajadores) => (this.trabajadores = trabajadores));
  }

  cargarLicencias(): void {
    const params = {
      id_user: this.userId,
    };

    this.consultaLicenciasService
      .consultarLicencias(params)
      .subscribe((licencias) => (this.licencias = licencias));
  }

  onSubmit(): void {
    if (this.consultaForm.valid) {
      const params = {
        id_user: this.userId,
        ...this.consultaForm.value,
      };

      this.consultaLicenciasService
        .consultarLicencias(params)
        .subscribe((licencias) => (this.licencias = licencias));
    }
  }
}
