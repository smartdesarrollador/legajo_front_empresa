import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GestionRoutingModule } from './gestion-routing.module';
import { PermisosComponent } from './permisos/permisos.component';
import { LicenciasComponent } from './licencias/licencias.component';
import { DescansosComponent } from './descansos/descansos.component';
import { BoletasComponent } from './boletas/boletas.component';
import { SancionesComponent } from './sanciones/sanciones.component';
import { ReconocimientosComponent } from './reconocimientos/reconocimientos.component';
import { EditarPermisoComponent } from './permisos/editar-permiso/editar-permiso.component';

@NgModule({
  declarations: [
    PermisosComponent,
    LicenciasComponent,
    DescansosComponent,
    BoletasComponent,
    SancionesComponent,
    ReconocimientosComponent,
    EditarPermisoComponent,
  ],
  imports: [CommonModule, GestionRoutingModule, ReactiveFormsModule],
})
export class GestionModule {}
