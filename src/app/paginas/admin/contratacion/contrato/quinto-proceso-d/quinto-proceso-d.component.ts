import { Component } from '@angular/core';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/interface/trabajador';
import { Router } from '@angular/router';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';

@Component({
  selector: 'app-quinto-proceso-d',
  templateUrl: './quinto-proceso-d.component.html',
  styleUrls: ['./quinto-proceso-d.component.css'],
})
export class QuintoProcesoDComponent {
  selectedValue: string = '';
  constructor(
    public ts: TrabajadorService,
    private router: Router,
    private cl: ContratoLocalStorageService
  ) {}

  saveToLocalStorage() {
    const contratoLocaldatos = this.cl.getItem('contratoLocal');
    contratoLocaldatos.modelo_contrato = this.selectedValue;

    this.cl.setItem('contratoLocal', contratoLocaldatos);

    /* localStorage.setItem('selectedValue', this.selectedValue); */

    this.router.navigate(['admin/contratacion/contrato/proceso_6']);
  }
}
