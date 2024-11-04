import { Vacaciones } from './vacaciones';

export interface FAcumulacionVacaciones {
  id_f_acumulacion_vacaciones: number;
  fecha_acumulacion?: string;
  dias_acumulados?: number;
  periodo_acumulado?: string;
  nro_dias_acumulados?: number;

  // Relación con Vacaciones
  vacaciones?: Vacaciones;
}
