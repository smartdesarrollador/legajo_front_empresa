import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  NgModel,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Trabajador } from 'src/app/interface/trabajador';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-segundo-proceso',
  templateUrl: './segundo-proceso.component.html',
  styleUrls: ['./segundo-proceso.component.css'],
})
export class SegundoProcesoComponent implements OnInit {
  trabajadorForm: FormGroup;
  ocupaciones: any[] = [];
  regimenesLaborales: any[] = [];
  areas: any[] = [];
  nivelesEducativos: any[] = [];
  regimenesSalud: any[] = [];
  regimenesPensiones: any[] = [];
  afps: any[] = [];
  ubigeos: any[] = [];
  empleadores: any[] = [];
  estadosTrabajador: any[] = [];
  jornadasLaborales: any[] = [];
  tiposDocumento: any[] = []; // Asegúrate de definir esta propiedad

  constructor(
    private fb: FormBuilder,
    private trabajadorService: TrabajadorService
  ) {
    this.trabajadorForm = this.fb.group({
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      primer: ['', Validators.required],
      segundo: [''],
      id_tipo_documento: [null, Validators.required],
      numero_documento: ['', [Validators.required, Validators.maxLength(50)]],
      fecha_nacimiento: ['', Validators.required],
      ruc: [''],
      direccion: ['', [Validators.required, Validators.maxLength(1000)]],
      referencia: [''],
      id_ubigeo: [null, Validators.required],
      telefono: [''],
      celular: [''],
      correo: ['', [Validators.email]],
      /* es_jefe: [0, Validators.required],
      fecha_ingreso: ['', Validators.required],
      fecha_egreso: [''],
      fecha_baja: [''], */
      id_empleador: [null, Validators.required],
      /*  id_regimen_laboral: [null, Validators.required],
      id_ocupacion: [null, Validators.required],
      id_tipo_contrato: [null, Validators.required],
      id_cargo: [null, Validators.required],
      id_area: [null, Validators.required],
      id_jornada_laboral: [null, Validators.required],
      id_estado_trabajador: [null, Validators.required],
      fecha_estado: [''],
      id_nivel_educativo: [null, Validators.required],
      id_regimen_salud: [null, Validators.required],
      id_regimen_pensiones: [null, Validators.required],
      id_afp: [null],
      cuspp: [''],
      es_discapacitado: [0, Validators.required],
      es_sindicalizado: [0, Validators.required],
      saldo_inicial_vacaciones: ['0.00', Validators.required], */
    });
  }

  ngOnInit(): void {
    this.loadSelectOptions();
  }

  loadSelectOptions(): void {
    this.trabajadorService.getOcupaciones().subscribe((data) => {
      this.ocupaciones = data;
      console.log('Ocupaciones:', this.ocupaciones);
    });
    this.trabajadorService.getRegimenesLaborales().subscribe((data) => {
      this.regimenesLaborales = data;
      console.log('Regímenes Laborales:', this.regimenesLaborales);
    });
    this.trabajadorService.getAreas().subscribe((data) => {
      this.areas = data;
      console.log('Áreas:', this.areas);
    });
    this.trabajadorService.getNivelesEducativos().subscribe((data) => {
      this.nivelesEducativos = data;
      console.log('Niveles Educativos:', this.nivelesEducativos);
    });
    this.trabajadorService.getRegimenesSalud().subscribe((data) => {
      this.regimenesSalud = data;
      console.log('Regímenes de Salud:', this.regimenesSalud);
    });
    this.trabajadorService.getRegimenesPensiones().subscribe((data) => {
      this.regimenesPensiones = data;
      console.log('Regímenes de Pensiones:', this.regimenesPensiones);
    });
    this.trabajadorService.getAfp().subscribe((data) => {
      this.afps = data;
      console.log('AFPs:', this.afps);
    });
    this.trabajadorService.getUbigeos().subscribe((data) => {
      this.ubigeos = data;
      console.log('Ubigeos:', this.ubigeos);
    });
    this.trabajadorService.getEmpleadores().subscribe((data) => {
      this.empleadores = data;
      console.log('Empleadores:', this.empleadores);
    });
    this.trabajadorService.getEstadosTrabajador().subscribe((data) => {
      this.estadosTrabajador = data;
      console.log('Estados de Trabajador:', this.estadosTrabajador);
    });
    this.trabajadorService.getJornadasLaborales().subscribe((data) => {
      this.jornadasLaborales = data;
      console.log('Jornadas Laborales:', this.jornadasLaborales);
    });
    this.trabajadorService.getTiposDocumento().subscribe((data) => {
      this.tiposDocumento = data;
      console.log('Tipos de Documento:', this.tiposDocumento);
    });
  }

  onSubmit() {
    if (this.trabajadorForm.valid) {
      console.log('Enviando datos del formulario:', this.trabajadorForm.value);
      this.trabajadorService
        .createTrabajador(this.trabajadorForm.value)
        .subscribe({
          next: (response) => {
            console.log('Trabajador creado con éxito', response);
          },
          error: (error) => {
            console.error('Error al crear el trabajador', error);
            if (error.status === 422) {
              console.error('Detalles del error:', error.error.errors);
            }
          },
        });
    } else {
      console.error('Formulario no válido');
    }
  }
}
