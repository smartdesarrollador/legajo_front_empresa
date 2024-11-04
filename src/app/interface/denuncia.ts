import { TipoDenuncia } from './tipo-denuncia';
import { Empleador } from './empleador';
import { Trabajador } from './trabajador';
import { EstadoDenuncia } from './estado-denuncia';

export interface Denuncia {
  id_denuncia: number; // Obligatorio
  fecha_denuncia?: string;
  fecha_cierre?: string;
  numero_documento?: string;
  tipo_denuncia?: TipoDenuncia;
  empleador?: Empleador;
  trabajador?: Trabajador;
  estado_denuncia?: EstadoDenuncia;
}
