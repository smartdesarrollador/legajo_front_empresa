export interface SelectOption {
  value: number;
  label: string;
}

export interface Licencia {
  id: number;
  motivo: string;
  fecha_inicio: string;
  fecha_fin: string;
  dias: number;
  estado: string;
  ver_acuerdo: string;
}

export interface ConsultaLicenciasParams {
  id_user: number;
  fecha_desde?: string;
  fecha_hasta?: string;
  id_area?: number;
  id_trabajador?: number;
}
