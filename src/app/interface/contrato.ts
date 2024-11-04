import { Empleador } from './empleador';
import { Trabajador } from './trabajador';
import { EstadoContrato } from './estado-contrato';
import { JornadaLaboral } from './jornada-laboral';
import { Cargo } from './cargo';
import { Funciones } from './funciones';
import { RegimenLaboral } from './regimen-laboral';
import { TipoContrato } from './tipo-contrato';

export interface Contrato {
  id_contrato: number; // Obligatorio
  fecha_inicio?: string;
  fecha_fin?: string;
  observacion?: string;

  // Relación con Empleador
  empleador?: Empleador;

  // Relación con Trabajador
  trabajador?: Trabajador;

  // Relación con Estado de Contrato
  estado_contrato?: EstadoContrato;

  // Relación con Jornada Laboral
  jornada_laboral?: JornadaLaboral;

  // Relación con Cargo
  cargo?: Cargo;

  // Relación con Funciones
  funciones?: Funciones;

  // Relación con Régimen Laboral
  regimen_laboral?: RegimenLaboral;

  // Relación con Tipo de Contrato
  tipo_contrato?: TipoContrato;
}
