import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CrearContratoService,
  ContratoCreate,
} from 'src/app/services/services/crear-contrato.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-crear-contrato',
  templateUrl: './crear-contrato.component.html',
  styles: [],
  providers: [JsonPipe],
})
export class CrearContratoComponent implements OnInit {
  contratoData: ContratoCreate | null = null;
  loading = false;
  error = '';
  protected JSON = JSON;

  constructor(
    private crearContratoService: CrearContratoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatosContrato();
  }

  cargarDatosContrato(): void {
    const contratoLocalStr = localStorage.getItem('contratoLocal');
    if (contratoLocalStr) {
      try {
        const contratoLocal = JSON.parse(contratoLocalStr);
        console.log('Datos del localStorage:', contratoLocal);

        // Formatear la fecha correctamente
        const formatearFecha = (fecha: string) => {
          if (!fecha) return null;
          const partes = fecha.split('/');
          if (partes.length === 3) {
            return `${partes[2]}-${partes[1].padStart(
              2,
              '0'
            )}-${partes[0].padStart(2, '0')}`;
          }
          return fecha;
        };

        // Mapear jornada según el valor de contratoLocal.jornada
        const mapearJornada = (jornada: string) => {
          switch (jornada) {
            case 'Jornada Tiempo completo':
              return 1;
            case 'Jornada Tiempo parcial':
              return 2;
            default:
              return 1; // valor por defecto
          }
        };

        // Mapear tipo de contrato según el valor de contratoLocal.tipo_contrato
        const mapearTipoContrato = (tipo: string) => {
          switch (tipo) {
            case 'Contrato modal':
              return 1;
            case 'Contrato indefinido':
              return 2;
            default:
              return 1; // valor por defecto
          }
        };

        this.contratoData = {
          id_trabajador: Number(contratoLocal.trabajador),
          id_empleador: Number(contratoLocal.empleador),
          jornada: mapearJornada(contratoLocal.jornada),
          tipo_contrato: mapearTipoContrato(contratoLocal.tipo_contrato),
          fecha_periodo: formatearFecha(contratoLocal.fecha_inicio),
          oferta_laboral: contratoLocal.oferta_laboral,
          motivo_contrato: contratoLocal.motivo_contrato,
          evidencia_documentaria: contratoLocal.evidencia_documentaria,
          fecha_suplencia: formatearFecha(contratoLocal.fecha_suplencia),
          genero_suplencia: contratoLocal.genero_suplencia,
          proyecto_obra_determinada: contratoLocal.proyecto_obra_determinada,
          ubicacion_obra_determinada: contratoLocal.ubicacion_obra_determinada,
          objeto_servicio_especifico: contratoLocal.objeto_servicio_especifico,
          nombre_servicio_especifico: contratoLocal.nombre_servicio_especifico,
          locacion_servicio_especifico:
            contratoLocal.locacion_servicio_especifico,
          objeto_contrato_temporada: contratoLocal.objeto_contrato_temporada,
          motivo_contrato_temporada: contratoLocal.motivo_contrato_temporada,
          evidencia_contrato_temporada:
            contratoLocal.evidencia_contrato_temporada,
          remuneracion: Number(contratoLocal.remuneracion),
          trabajador_confianza: Boolean(contratoLocal.trabajador_confianza),
          trabajador_direccion: Boolean(contratoLocal.trabajador_direccion),
          pregunta_1: Boolean(contratoLocal.pregunta_1),
          pregunta_2: Boolean(contratoLocal.pregunta_2),
          pregunta_3: Boolean(contratoLocal.pregunta_3),
          fiscalizacion_inmediata: Boolean(
            contratoLocal.fiscalizacion_inmediata
          ),
          jornada_maxima: Boolean(contratoLocal.jornada_maxima),
          dia_inicio: contratoLocal.dia_inicio,
          dia_final: contratoLocal.dia_final,
          horario_inicio: contratoLocal.horario_inicio,
          horario_final: contratoLocal.horario_final,
          prevencion_covid: Boolean(contratoLocal.prevencion_covid),
          obligaciones_compromisos: Boolean(
            contratoLocal.obligaciones_compromisos
          ),
          confidencialidad: Boolean(contratoLocal.confidencialidad),
          propiedad_intelectual: Boolean(contratoLocal.propiedad_intelectual),
          tecnologia_informacion: Boolean(contratoLocal.tecnologia_informacion),
          exclusividad: Boolean(contratoLocal.exclusividad),
          proteccion_datos: Boolean(contratoLocal.proteccion_datos),
        };

        console.log('Datos mapeados:', this.contratoData);
      } catch (error) {
        console.error('Error al parsear datos del contrato:', error);
        this.error = 'Error al cargar los datos del contrato';
      }
    }
  }

  private obtenerIdJornada(jornadaNombre: string): number {
    // Aquí deberías implementar la lógica para convertir el nombre de la jornada a su ID
    // Por ejemplo, usando un mapeo o una llamada al servicio
    return 1; // Valor temporal
  }

  private obtenerIdTipoContrato(tipoContratoNombre: string): number {
    // Aquí deberías implementar la lógica para convertir el nombre del tipo de contrato a su ID
    return 1; // Valor temporal
  }

  crearContrato(): void {
    if (!this.contratoData) {
      this.error = 'No hay datos para crear el contrato';
      return;
    }

    // Validar solo los campos mínimos requeridos
    if (
      !this.contratoData.id_trabajador ||
      !this.contratoData.id_empleador ||
      !this.contratoData.fecha_periodo
    ) {
      this.error = 'Faltan campos esenciales del contrato';
      return;
    }

    this.loading = true;
    this.error = '';

    console.log('Enviando datos:', this.contratoData);

    this.crearContratoService.crearContrato(this.contratoData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        if (response.success) {
          console.log('Contrato creado exitosamente:', response);
          localStorage.removeItem('contratoLocal');
          this.router.navigate([
            '/admin/contratacion/contrato/consulta-contrato',
          ]);
        } else {
          this.error = response.message || 'Error al crear el contrato';
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error detallado:', error);
        this.error = error.message || 'Error desconocido al crear el contrato';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
