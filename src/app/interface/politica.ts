import { TipoPolitica } from './tipo-politica';
import { Empleador } from './empleador';

export interface Politica {
  id_politica: number;
  politica?: string;
  resumen?: string;

  // Relaciones
  tipo_politica?: TipoPolitica;
  empleador?: Empleador;
}
