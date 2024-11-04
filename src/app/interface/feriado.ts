import { Anno } from './anno';

export interface Feriado {
  id_feriado: number;
  feriado?: string;
  fecha?: string;

  // Relación con Año
  anno?: Anno;
}
