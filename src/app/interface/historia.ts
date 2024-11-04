import { Empleador } from './empleador';
import { Trabajador } from './trabajador';
import { TipoHistoria } from './tipo-historia';
import { Evento } from './evento';
import { Accion } from './accion';
import { Severidad } from './severidad';

export interface Historia {
  id_historia: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  observacion?: string;
  empleador?: Empleador;
  trabajador?: Trabajador;
  tipo_historia?: TipoHistoria;
  evento?: Evento;
  accion?: Accion;
  severidad?: Severidad;
}
