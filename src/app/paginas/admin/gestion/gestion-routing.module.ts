import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisosComponent } from './permisos/permisos.component';
import { EditarPermisoComponent } from './permisos/editar-permiso/editar-permiso.component';
import { ConsultaVacacionesComponent } from './consulta-vacaciones/consulta-vacaciones.component';
import { ConsultaLicenciasComponent } from './licencias/consulta-licencias/consulta-licencias.component';
import { EditarLicenciaComponent } from './licencias/editar-licencia/editar-licencia.component';
const routes: Routes = [
  /* {
    path: 'permisos',
    component: PermisosComponent,
  }, */
  {
    path: 'permisos/editar/:id',
    component: EditarPermisoComponent,
  },
  {
    path: 'consulta-vacaciones',
    component: ConsultaVacacionesComponent,
  },
  {
    path: 'consulta-licencias',
    component: ConsultaLicenciasComponent,
  },
  {
    path: 'editar-licencia/:id',
    component: EditarLicenciaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRoutingModule {}
