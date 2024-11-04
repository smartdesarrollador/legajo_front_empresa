import { Vacaciones } from './vacaciones';

export interface EstadoAprobacion {
  id_estado_aprobacion: number;
  estado_aprobacion?: string;
  aprobado_por?: string;
  cargo?: string;
  fecha_aprobacion?: string;
  comentario?: string;
  vacaciones?: Vacaciones; // Relación con Vacaciones
}
