import { Component, OnInit, ViewChild } from '@angular/core';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from 'src/app/interface/trabajador';
import { EmpleadorService } from 'src/app/services/empleador.service';
/* import { Empleador } from 'src/app/interface/empleador'; */
import { Empleador } from 'src/app/interface/interface/empleador';
import { Router } from '@angular/router';
import { ContratoLocalStorageService } from 'src/app/services/localstorage/contrato-local-storage.service';
import Swal from 'sweetalert2';
import { myFunctions } from 'src/app/utils/myFunctions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-primer-proceso',
  templateUrl: './primer-proceso.component.html',
  styleUrls: ['./primer-proceso.component.css'],
})
export class PrimerProcesoComponent {
  listTrabajadores: any = [];
  ultimoIdEmpleador: any = [];
  selectedValue: string = '';
  valorSeleccionado: any;
  datosLocales: any = {};
  Swal = require('sweetalert2');
  @ViewChild('form1', { static: true }) form1: any;

  constructor(
    public ts: TrabajadorService,
    public es: EmpleadorService,
    private router: Router,
    private cl: ContratoLocalStorageService,
    private myFunctions: myFunctions,
    private ToastrSvc: ToastrService
  ) {}

  ngOnInit(): void {
    this.asignarValorTrabajador();
    console.log(this.asignarValorTrabajador());
    this.loadTrabajadores();
    this.getUltimoIdEmpleador();
    this.myFunctions.scrollToTop();
  }

  asignarValorTrabajador(): void {
    const contratoLocal = this.cl.getItem('contratoLocal');

    if (contratoLocal) {
      this.datosLocales = contratoLocal;
      this.selectedValue = this.datosLocales.trabajador;
    }
  }

  alerta_toastr() {
    this.ToastrSvc.success('hola');
    /* this.alerta(); */
  }

  loadTrabajadores() {
    this.ts.getTrabajadoresListar().subscribe((response: any) => {
      console.log(response);
      this.listTrabajadores = response.data; // Asegúrate de que estás asignando el array de trabajadores.
    });
  }

  /* loadTrabajadores() {
    return this.ts.getTrabajadores().subscribe((data: {}) => {
      console.log(data);
      this.listTrabajadores = data;
    });
  }
 */
  getUltimoIdEmpleador() {
    return this.es.getUltimoEmpleador().subscribe((data: {}) => {
      console.log(data);
      this.ultimoIdEmpleador = data;
    });
  }

  saveToLocalStorage() {
    if (this.form1.form.valid) {
      if (this.cl.getItem('contratoLocal')) {
        const contratoLocaldatos = this.cl.getItem('contratoLocal');
        contratoLocaldatos.trabajador = this.selectedValue;
        contratoLocaldatos.empleador = this.ultimoIdEmpleador['id_empleador'];

        this.cl.setItem('contratoLocal', contratoLocaldatos);
      } else {
        this.cl.setItem('contratoLocal', {
          trabajador: this.selectedValue,
          empleador: this.ultimoIdEmpleador['id_empleador'],
        });
      }

      this.router.navigate(['admin/contratacion/contrato/proceso_3']);
      const formValue = this.form1.form.value;
      console.log('Valores del formulario:', formValue);
    } else {
      this.ToastrSvc.error(
        'Se necesita seleccionar trabajador',
        'Campo Requerido'
      );
      /* this.alerta(); */
    }
  }

  alerta() {
    Swal.fire({
      icon: 'error',
      title: 'Campo requerido',
    });
  }
}
