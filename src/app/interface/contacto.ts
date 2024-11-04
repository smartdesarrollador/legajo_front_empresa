import { Empleador } from './empleador';
import { TipoContacto } from './tipo-contacto';
import { Area } from './area';

export interface Contacto {
  id_contacto: number; // Obligatorio
  contacto?: string;
  telefono?: string;
  celular?: string;
  correo?: string;

  // Relación con Empleador
  empleador?: Empleador;

  // Relación con Tipo de Contacto
  tipo_contacto?: TipoContacto;

  // Relación con Área
  area?: Area;
}
