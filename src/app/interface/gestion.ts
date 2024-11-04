import { Periodo } from './periodo';
import { Documento } from './documento';
import { Trabajador } from './trabajador';
import { Empleador } from './empleador';
import { ClaseDocumento } from './clase-documento';

export interface Gestion {
  id_gestion: number;
  gestion?: string;
  fecha?: string;
  periodo?: Periodo;
  documento?: Documento;
  trabajador?: Trabajador;
  empleador?: Empleador;
  clase_documento?: ClaseDocumento;
}
