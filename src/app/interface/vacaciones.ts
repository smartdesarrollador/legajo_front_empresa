import { TipoVacaciones } from './tipo-vacaciones';
import { Trabajador } from './trabajador';

export interface Vacaciones {
  id_vacaciones: number;
  fecha_solicitud?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  dias?: number;
  tipo_vacaciones?: TipoVacaciones;
  trabajador?: Trabajador;
}
