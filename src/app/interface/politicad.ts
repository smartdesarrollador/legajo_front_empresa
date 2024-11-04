import { Politica } from './politica';
import { Documento } from './documento';
import { ActividadDenuncia } from './actividad-denuncia';

export interface PoliticaD {
  id_politica_d: number;
  secuencia?: number;
  resumen?: string;
  enviar_correo?: boolean;
  requiere_cargo?: boolean;

  // Relaciones
  politica?: Politica;
  documento?: Documento;
  actividad_denuncia?: ActividadDenuncia;
}
