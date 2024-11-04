import { EmpleadorRegimenLaboral } from './empleador-regimen-laboral';
import { RegimenLaboral } from './regimen-laboral';
import { ActividadEconomica } from './actividad-economica';
import { TipoEmpleador } from './tipo-empleador';

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
  regimen_laboral?: RegimenLaboral[]; // Asegúrate de definir esto como un array de RegimenLaboral
  created_at?: string;
  updated_at?: string;

  tipo_empleador?: TipoEmpleador;
}
