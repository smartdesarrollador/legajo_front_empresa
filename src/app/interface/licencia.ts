import { Area } from './area';
import { Trabajador } from './trabajador';
import { EstadoPermiso } from './estado-permiso';

export interface Licencia {
  id_licencia: number;
  fecha_emision?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  jefe_vacaciones?: string;
  motivo?: string;

  // Relación con Área
  area?: Area;

  // Relación con Trabajador
  trabajador?: Trabajador;

  // Relación con Estado de Permiso
  estado_permiso?: EstadoPermiso;
}
