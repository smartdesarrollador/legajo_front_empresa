import { Historia } from './historia';
import { Documento } from './documento';
import { Situacion } from './situacion';

export interface HistoriaD {
  id_historia_d: number;
  comentario?: string;
  historia?: Historia;
  documento?: Documento;
  situacion?: Situacion;
}
