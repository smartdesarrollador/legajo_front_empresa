import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadorService } from 'src/app/services/empleador.service';
import { Empleador } from 'src/app/interface/empleador';
import { ToastrService } from 'ngx-toastr';
import { RegimenLaboral } from 'src/app/interface/regimen-laboral';

@Component({
  selector: 'app-editar-empleador',
  templateUrl: './editar-empleador.component.html',
  styleUrls: ['./editar-empleador.component.css'],
})
export class EditarEmpleadorComponent implements OnInit {
  empleadorForm: FormGroup;
  idEmpleador: number;
  regimenesLaborales: RegimenLaboral[] = []; // Almacena las opciones de régimen laboral

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private empleadorService: EmpleadorService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.idEmpleador = +this.route.snapshot.params['id'];
    this.empleadorForm = this.fb.group({
      empleador: ['', [Validators.required, Validators.maxLength(255)]],
      ruc: ['', [Validators.required, Validators.maxLength(20)]],
      domicilio: ['', [Validators.required, Validators.maxLength(500)]],
      representante_legal: [
        '',
        [Validators.required, Validators.maxLength(255)],
      ],
      dni_representante_legal: [
        '',
        [Validators.required, Validators.maxLength(20)],
      ],
      cargo_representante_legal: ['', [Validators.maxLength(200)]],
      numero_partida_poderes: ['', [Validators.maxLength(20)]],
      numero_asiento: ['', [Validators.maxLength(20)]],
      oficina_registral: ['', [Validators.maxLength(200)]],
      numero_partida_registral: ['', [Validators.maxLength(50)]],
      fecha_inicio_actividades: ['', [Validators.required]],
      id_regimen_laboral: [null, [Validators.required]], // Campo para el select del régimen laboral
    });
  }

  ngOnInit(): void {
    this.cargarEmpleador();
    this.cargarRegimenesLaborales();
  }

  // Método para cargar los datos del empleador
  cargarEmpleador(): void {
    this.empleadorService.getEmpleadorByIdUser(this.idEmpleador).subscribe(
      (empleador: Empleador) => {
        this.empleadorForm.patchValue(empleador);
        if (empleador.regimen_laboral && empleador.regimen_laboral.length > 0) {
          this.empleadorForm.patchValue({
            id_regimen_laboral: empleador.regimen_laboral[0].id_regimen_laboral,
          });
        }
      },
      (error) => {
        console.error('Error al cargar el empleador', error);
        this.toastr.error('Error al cargar los datos del empleador.');
      }
    );
  }

  // Método para cargar los regímenes laborales
  cargarRegimenesLaborales(): void {
    this.empleadorService.getRegimenesLaborales().subscribe(
      (regimenes: RegimenLaboral[]) => {
        this.regimenesLaborales = regimenes;
        console.log('Regímenes laborales cargados:', this.regimenesLaborales);
      },
      (error) => {
        console.error('Error al cargar los regímenes laborales', error);
      }
    );
  }

  // Método para guardar los cambios
  onSubmit(): void {
    if (this.empleadorForm.valid) {
      this.empleadorService
        .updateEmpleador(this.idEmpleador, this.empleadorForm.value)
        .subscribe(
          () => {
            this.toastr.success('Empleador actualizado con éxito.');
            this.router.navigate(['/admin/configuracion/empresa']);
          },
          (error) => {
            console.error('Error al actualizar el empleador', error);
            this.toastr.error('Hubo un problema al actualizar el empleador.');
          }
        );
    } else {
      this.toastr.error('Por favor, completa todos los campos requeridos.');
    }
  }
}
