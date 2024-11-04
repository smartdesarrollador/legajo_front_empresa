import { Empleador } from './empleador';
import { RegimenLaboral } from './regimen-laboral';

export interface EmpleadorRegimenLaboral {
  id_empleador_regimen_laboral: number;
  empleador_regimen_laboral?: string;
  empleador?: Empleador;
  regimen_laboral?: RegimenLaboral;
}
