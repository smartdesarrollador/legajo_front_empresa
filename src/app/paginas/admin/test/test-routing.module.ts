import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarEmpleadorComponent } from './listar-empleador/listar-empleador.component';
import { GenerateWordComponent } from './generate-word/generate-word.component';

const routes: Routes = [
  {
    path: 'listar_empleador',
    component: ListarEmpleadorComponent,
  },
  {
    path: 'generate-word',
    component: GenerateWordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule {}
