import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/contrato.service';
import { ObtenerDatosDocumentoService } from 'src/app/services/services/obtener-datos-documento.service';
import { Contrato } from 'src/app/interface/contrato';
import { Area } from 'src/app/interface/area';
import { EstadoContrato } from 'src/app/interface/estado-contrato';
import { TipoContrato } from 'src/app/interface/tipo-contrato';
import { Trabajador } from 'src/app/interface/trabajador';
import { dateFunctions } from 'src/app/utils/dateFunctions';

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

  constructor(
    private contratoService: ContratoService,
    private obtenerDatosDocumentoService: ObtenerDatosDocumentoService,
    private convertirFormatoFecha: dateFunctions
  ) {}

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

  async descargarDocumento(id: number): Promise<void> {
    try {
      const response = await this.obtenerDatosDocumentoService
        .obtenerDatosDocumento(id)
        .toPromise();

      if (response && response.success) {
        const data = response.data;
        console.log('Datos del contrato:', data);
        console.log('Tipo de contrato recibido:', data.contrato.tipo_contrato);

        // Adaptar los datos del trabajador
        const trabajadorAdaptado = {
          primer_nombre: data.trabajador.nombres?.split(' ')[0] || '',
          segundo_nombre: data.trabajador.nombres?.split(' ')[1] || '',
          apellido_paterno: data.trabajador.apellidos?.split(' ')[0] || '',
          apellido_materno: data.trabajador.apellidos?.split(' ')[1] || '',
          numero_documento: data.trabajador.numero_documento || '',
          direccion: data.trabajador.direccion || '',
        };

        // Adaptar los datos del empleador
        const empleadorAdaptado = {
          empleador: data.empleador.nombre || '',
          ruc: data.empleador.ruc || '',
          domicilio: data.empleador.domicilio || '',
          representante_legal: data.empleador.representante_legal || '',
          actividad_economica: data.empleador.actividad_economica || '',
          domiciliado: data.empleador.domicilio || '',
          numero_partida_registral:
            data.empleador.numero_partida_registral || '',
          numero_asiento: data.empleador.numero_asiento || '',
          oficina_registral: data.empleador.oficina_registral || '',
          dni_representante_legal: data.empleador.dni_representante_legal || '',
          cargo_representante_legal:
            data.empleador.cargo_representante_legal || '',
        };

        // Adaptar datos locales
        const datosLocalesAdaptados = {
          ...data.detalle,
          modelo_contrato: data.contrato.tipo_contrato || 'INDETERMINADO',
          fecha_inicio: data.contrato.fecha_inicio,
          fecha_fin: data.contrato.fecha_fin || '',
          oferta_laboral: data.detalle.oferta_laboral,
          remuneracion: data.detalle.remuneracion,
          horario_inicio: data.detalle.horario_inicio,
          horario_final: data.detalle.horario_final,
          dia_inicio: data.detalle.dia_inicio,
          dia_final: data.detalle.dia_final,
          motivo_contrato: data.detalle.motivo_contrato || '',
          evidencia_documentaria: data.detalle.evidencia_documentaria || '',
          objeto_servicio_especifico:
            data.detalle.objeto_servicio_especifico || '',
          ...data.condiciones,
        };

        // Calcular período de prueba
        const prueba_meses = this.calcularMesesPrueba(data.condiciones);
        const prueba_inicio = data.contrato.fecha_inicio;
        const prueba_termino = this.calcularFechaTermino(
          prueba_inicio,
          parseInt(prueba_meses)
        );

        // Obtener numeración de valores
        const num_valores = this.obtenerNumeracionValores(
          data.contrato.tipo_contrato
        );

        // Formatear fecha actual
        const fechaActualValor = new Intl.DateTimeFormat('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(new Date());

        await this.obtenerDatosDocumentoService.generarDocumentoContrato(
          trabajadorAdaptado,
          empleadorAdaptado,
          datosLocalesAdaptados,
          prueba_meses,
          prueba_inicio,
          prueba_termino,
          this.convertirFormatoFecha.convertirFecha(data.contrato.fecha_inicio),
          num_valores,
          fechaActualValor
        );
      }
    } catch (error) {
      console.error('Error al descargar el documento:', error);
    }
  }

  private calcularMesesPrueba(condiciones: any): string {
    if (condiciones.trabajador_confianza) {
      return '6 Meses';
    } else if (condiciones.trabajador_direccion) {
      return '12 Meses';
    }
    return '3 Meses';
  }

  private calcularFechaTermino(fechaInicio: string, meses: number): string {
    const fecha = new Date(fechaInicio);
    fecha.setMonth(fecha.getMonth() + meses);
    return fecha.toISOString().split('T')[0];
  }

  private obtenerNumeracionValores(tipoContrato: string): string[] {
    const ordinales = [
      'PRIMERA',
      'SEGUNDA',
      'TERCERA',
      'CUARTA',
      'QUINTA',
      'SEXTA',
      'SEPTIMA',
      'OCTAVA',
      'NOVENA',
      'DECIMA',
      'DECIMOPRIMERA',
      'DECIMOSEGUNDA',
      'DECIMOTERCERA',
      'DECIMOCUARTA',
      'DECIMOQUINTA',
    ];

    // Aquí puedes agregar lógica específica según el tipo de contrato
    return ordinales;
  }
}
