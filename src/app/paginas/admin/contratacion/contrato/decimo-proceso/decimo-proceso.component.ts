import { Component } from '@angular/core';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/interface/trabajador';
import { Router } from '@angular/router';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';

@Component({
  selector: 'app-decimo-proceso',
  templateUrl: './decimo-proceso.component.html',
  styleUrls: ['./decimo-proceso.component.css'],
})
export class DecimoProcesoComponent {
  prevencion_covid: boolean = false;
  datosLocales: any = {};

  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {}

  ngOnInit() {
    this.asignarCovid();
  }

  asignarCovid(): void {
    const contratoLocal = this.cl.getItem('contratoLocal');

    if (contratoLocal) {
      this.datosLocales = contratoLocal;
      if (
        this.datosLocales.prevencion_covid == true ||
        this.datosLocales.prevencion_covid == false
      ) {
        this.prevencion_covid = this.datosLocales.prevencion_covid;
      } else {
        this.prevencion_covid = false;
      }
    }
  }

  saveToLocalStorage() {
    const contratoLocaldatos = this.cl.getItem('contratoLocal');
    contratoLocaldatos.prevencion_covid = this.prevencion_covid;

    this.cl.setItem('contratoLocal', contratoLocaldatos);

    this.router.navigate(['admin/contratacion/contrato/proceso_11']);
  }
}
