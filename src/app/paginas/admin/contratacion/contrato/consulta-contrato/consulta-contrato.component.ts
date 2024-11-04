import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';
import { Contrato } from 'src/app/interface/contrato';
import { Area } from 'src/app/interface/area';
import { EstadoContrato } from 'src/app/interface/estado-contrato';
import { TipoContrato } from 'src/app/interface/tipo-contrato';
import { Trabajador } from 'src/app/interface/trabajador';

@Component({
  selector: 'app-consulta-contrato',
  templateUrl: './consulta-contrato.component.html',
  styleUrls: ['./consulta-contrato.component.css'],
})
export class ConsultaContratoComponent implements OnInit {
  contratos: Contrato[] = [];
  areas: Area[] = [];
  estadosContrato: EstadoContrato[] = [];
  tiposContrato: TipoContrato[] = [];
  trabajadores: Trabajador[] = [];
  filters = {
    area: '',
    estado_contrato: '',
    trabajador: '',
    tipo_contrato: '',
  };
  page = 1;

  constructor(private contratoService: ContratoService) {}

  ngOnInit(): void {
    this.loadAreas();
    this.loadEstadosContrato();
    this.loadTiposContrato();
    this.loadTrabajadores();
    this.loadContratos();
  }

  loadAreas() {
    this.contratoService.getAreas().subscribe((data) => {
      this.areas = data;
    });
  }

  loadEstadosContrato() {
    this.contratoService.getEstadosContrato().subscribe((data) => {
      this.estadosContrato = data;
    });
  }

  loadTiposContrato() {
    this.contratoService.getTiposContrato().subscribe((data) => {
      this.tiposContrato = data;
    });
  }

  loadTrabajadores() {
    this.contratoService.getTrabajadores().subscribe((data) => {
      this.trabajadores = data;
    });
  }

  loadContratos() {
    this.contratoService.getContratos(this.filters).subscribe((data) => {
      this.contratos = data;
    });
  }

  applyFilters() {
    this.page = 1; // Resetear a la primera página al aplicar filtros
    this.loadContratos();
  }
}
