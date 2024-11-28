import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisosComponent } from './permisos/permisos.component';
import { EditarPermisoComponent } from './permisos/editar-permiso/editar-permiso.component';

const routes: Routes = [
  /* {
    path: 'permisos',
    component: PermisosComponent,
  }, */
  {
    path: 'permisos/editar/:id',
    component: EditarPermisoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRoutingModule {}
