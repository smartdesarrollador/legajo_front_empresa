import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { EmpresaComponent } from './empresa/empresa.component';
import { EditarEmpleadorComponent } from './empresa/editar-empleador/editar-empleador.component';

@NgModule({
  declarations: [EmpresaComponent, EditarEmpleadorComponent],
  imports: [CommonModule, ConfiguracionRoutingModule, ReactiveFormsModule],
})
export class ConfiguracionModule {}
