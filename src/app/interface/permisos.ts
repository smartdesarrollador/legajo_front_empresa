import { Area } from './area';
import { Trabajador } from './trabajador';
import { EstadoPermiso } from './estado-permiso';

export interface Permisos {
  id_permiso: number;
  permiso?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  horas?: number;
  jefe_inmediato?: string;
  motivo?: string;
  adjunto?: string;

  // Relaciones
  area?: Area | null;
  trabajador?: Trabajador | null;
  estado_permiso?: EstadoPermiso | null;
}
