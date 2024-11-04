import { Vacaciones } from './vacaciones';

export interface FAdelantoVacaciones {
  id_f_adelanto_vacaciones: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  periodo_actual?: string;
  periodo_restante?: string;
  dias_adelantados?: number;

  // Relación con Vacaciones
  vacaciones?: Vacaciones;
}
