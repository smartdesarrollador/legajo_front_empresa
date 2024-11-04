import { Empleador } from './empleador';

export interface Documento {
  id_documento: number;
  documento?: string;
  resumen?: string;
  version?: string;
  fecha_version?: string;
  archivo?: string;
  empleador?: Empleador;
}
