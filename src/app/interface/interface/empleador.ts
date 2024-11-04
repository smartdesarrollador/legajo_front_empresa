export interface Empleador {
  id_empleador?: number;
  empleador?: string;
  ruc?: string;
  domicilio?: string;
  representante_legal?: string;
  dni_representante_legal?: string;
  cargo_representante_legal?: string;
  numero_partida_poderes?: string;
  numero_asiento?: string;
  oficina_registral?: string;
  numero_partida_registral?: string;
  fecha_inicio_actividades?: string;
  actividad_economica?: ActividadEconomica;
  created_at?: string;
  updated_at?: string;
}

export interface ActividadEconomica {
  id_actividad_economica?: number;
  actividad_economica?: string;
  created_at?: string | null;
  updated_at?: string | null;
}
