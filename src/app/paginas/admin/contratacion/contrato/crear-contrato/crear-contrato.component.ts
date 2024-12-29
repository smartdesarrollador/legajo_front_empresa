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
    this.crearContrato();
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

        // Formatear hora
        const formatearHora = (hora: string | undefined): string | null => {
          if (!hora) return null;
          try {
            // Separar la hora y el período (AM/PM)
            const [tiempo, periodo] = hora.split(' ');
            let [horas, minutos] = tiempo
              .split(':')
              .map((num) => parseInt(num));

            // Convertir a formato 24 horas
            if (periodo) {
              if (periodo.toLowerCase() === 'pm' && horas !== 12) {
                horas += 12;
              } else if (periodo.toLowerCase() === 'am' && horas === 12) {
                horas = 0;
              }
            }

            // Asegurar que los números tengan dos dígitos
            const horasStr = horas.toString().padStart(2, '0');
            const minutosStr = minutos.toString().padStart(2, '0');

            // Retornar en formato HH:mm:ss
            return `${horasStr}:${minutosStr}:00`;
          } catch (error) {
            console.error('Error al formatear hora:', error);
            return null;
          }
        };

        // Asegurar que los días tengan un valor por defecto
        const getDiaValue = (dia: string | undefined): string => {
          if (!dia) return 'Lunes'; // valor por defecto
          return dia.charAt(0).toUpperCase() + dia.slice(1).toLowerCase();
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
          pregunta_1: contratoLocal.pregunta_1?.toString() || '',
          pregunta_2: contratoLocal.pregunta_2?.toString() || '',
          pregunta_3: contratoLocal.pregunta_3?.toString() || '',
          fiscalizacion_inmediata: Boolean(
            contratoLocal.fiscalizacion_inmediata
          ),
          jornada_maxima: Boolean(contratoLocal.jornada_maxima),
          dia_inicio: getDiaValue(contratoLocal.dia_inicio),
          dia_final: getDiaValue(contratoLocal.dia_final),
          horario_inicio: formatearHora(contratoLocal.horario_inicio),
          horario_final: formatearHora(contratoLocal.horario_final),
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

        // Verificar que los datos estén completos antes de enviar
        if (!this.contratoData.dia_inicio || !this.contratoData.dia_final) {
          throw new Error('Los días de inicio y fin son requeridos');
        }

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

    // Debug
    console.log('Datos a enviar al servidor:', {
      dia_inicio: this.contratoData.dia_inicio,
      dia_final: this.contratoData.dia_final,
      // otros campos importantes...
    });

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
