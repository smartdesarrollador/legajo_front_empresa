export interface ConsultaVacacionesRequest {
  fecha_desde?: string;
  fecha_hasta?: string;
  id_tipo_vacaciones?: number;
  id_trabajador?: number;
  id_user: number;
}

export interface TipoVacaciones {
  id: number;
  nombre: string;
}

export interface Trabajador {
  id: number;
  nombre_completo: string;
  numero_documento: string;
}

export interface EstadoAprobacion {
  estado: string;
  fecha_aprobacion: string;
  aprobado_por: string;
  cargo: string;
  comentario: string;
}

export interface SaldoVacaciones {
  dias_acumulados: number;
  dias_vencidos: number;
  dias_usados: number;
  saldo_actual: number;
}

export interface Vacaciones {
  id_vacaciones: number;
  fecha_solicitud: string;
  fecha_inicio: string;
  fecha_fin: string;
  dias: number;
  tipo_vacaciones: TipoVacaciones;
  trabajador: Trabajador;
  estado_aprobacion: EstadoAprobacion | null;
  saldo_vacaciones: SaldoVacaciones | null;
}
