import { Denuncia } from './denuncia';
import { ActividadDenuncia } from './actividad-denuncia';
import { Documento } from './documento';

export interface DenunciaD {
  id_denuncia_d: number; // Obligatorio
  detalle_denuncia?: string;
  secuencia?: number;
  denuncia?: Denuncia;
  actividad_denuncia?: ActividadDenuncia;
  documento?: Documento;
}
