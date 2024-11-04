import { Empleador } from './empleador';
import { Trabajador } from './trabajador';
import { Documento } from './documento';
import { Notificacion } from './notificacion';

export interface Delivery {
  id_delivery: number; // Obligatorio
  fecha_confirmacion?: string;
  confirmacion?: boolean;
  empleador?: Empleador;
  trabajador?: Trabajador;
  documento?: Documento;
  notificacion?: Notificacion;
}
