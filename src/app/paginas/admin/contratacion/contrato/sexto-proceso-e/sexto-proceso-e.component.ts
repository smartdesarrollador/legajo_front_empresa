import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Trabajador } from 'src/app/interface/trabajador';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sexto-proceso-e',
  templateUrl: './sexto-proceso-e.component.html',
  styleUrls: ['./sexto-proceso-e.component.css'],
})
export class SextoProcesoEComponent {
  selectedValue: string = '';
  primera_pregunta: string = '';
  segunda_pregunta: string = '';
  @ViewChild('form1', { static: true }) form1: any;
  datosLocales: any = {};
  objeto_servicio_especifico: string = '';
  nombre_servicio_especifico: string = '';
  locacion_servicio_especifico: string = '';

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {}

  ngOnInit(): void {}

  saveToLocalStorage() {
    if (this.form1.form.valid) {
      console.log(this.primera_pregunta);
      const contratoLocaldatos = this.cl.getItem('contratoLocal');
      contratoLocaldatos.objeto_servicio_especifico =
        this.objeto_servicio_especifico;
      contratoLocaldatos.nombre_servicio_especifico =
        this.nombre_servicio_especifico;
      contratoLocaldatos.locacion_servicio_especifico =
        this.locacion_servicio_especifico;
      this.cl.setItem('contratoLocal', contratoLocaldatos);

      this.router.navigate(['admin/contratacion/contrato/proceso_7']);
    } else {
      this.alerta();
    }
  }

  alerta() {
    Swal.fire({
      icon: 'error',
      title: 'Campo requerido',
    });
  }
}
