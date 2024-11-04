import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { EditarEmpleadorComponent } from './empresa/editar-empleador/editar-empleador.component';

const routes: Routes = [
  {
    path: 'empresa',
    component: EmpresaComponent,
  },
  {
    path: 'editar-empleador/:id',
    component: EditarEmpleadorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionRoutingModule {}
