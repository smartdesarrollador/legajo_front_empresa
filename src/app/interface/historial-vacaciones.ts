import { Trabajador } from './trabajador';
import { TipoMovimiento } from './tipo-movimiento';

export interface HistorialVacaciones {
  id_historial_vacaciones: number;
  historial_vacaciones?: string;
  fecha?: string;
  dias?: number;
  comentarios?: string;
  trabajador?: Trabajador;
  tipo_movimiento?: TipoMovimiento;
}
