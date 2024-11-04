/* import { Empleador } from './empleador';
import { Trabajador } from './trabajador';
import { Curso } from './curso';
import { EstadoEvaluacion } from './estado-evaluacion';
import { Documento } from './documento';
import { Instructor } from './instructor'; */

import { Empleador } from './empleador';
import { Trabajador } from './trabajador';
import { Curso } from './curso';
import { EstadoEvaluacion } from './estado-evaluacion';
import { Documento } from './documento';
import { Instructor } from './instructor';

export interface Capacitacion {
  id_capacitacion: number; // Obligatorio
  capacitacion?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  observacion?: string;

  // Relaciones
  empleador?: Empleador;
  trabajador?: Trabajador;
  curso?: Curso;
  estado_evaluacion?: EstadoEvaluacion;
  documento?: Documento;
  instructor?: Instructor;
}
