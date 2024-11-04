import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadorComponent } from './empleador/empleador.component';
import { EmpleadorDosComponent } from './empleador-dos/empleador-dos.component';

const routes: Routes = [
  {
    path: 'empleador',
    component: EmpleadorComponent,
  },
  {
    path: 'empleador-dos',
    component: EmpleadorDosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegajoRoutingModule {}
