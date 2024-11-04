import { Vacaciones } from './vacaciones';

export interface FReduccionVacaciones {
  id_f_reduccion_vacaciones: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  periodo_inicio_laboral?: string;
  periodo_fin_laboral?: string;
  nro_dias_reduccion?: number;

  // Relación con Vacaciones
  vacaciones?: Vacaciones;
}
