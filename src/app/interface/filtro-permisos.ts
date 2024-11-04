export interface FiltroPermisos {
  id_trabajador?: number; // ID del trabajador para filtrar los permisos por trabajador.
  fecha_inicio?: string; // Fecha de inicio del rango de búsqueda (formato 'YYYY-MM-DD').
  fecha_fin?: string; // Fecha de fin del rango de búsqueda (formato 'YYYY-MM-DD').
}
