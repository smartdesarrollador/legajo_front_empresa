import { Trabajador } from './trabajador';

export interface SaldoVacaciones {
  id_saldo_vacaciones: number;
  anno?: number;
  dias_acumulados?: number;
  dias_vencidos?: number;
  dias_usados?: number;
  saldo_vacaciones?: number;

  // Relación con Trabajador
  trabajador?: Trabajador;
}
