import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test.component';

const routes: Routes = [
  {
    path: 'carga-perezosa',
    component: TestComponent,
    loadChildren: () =>
      import('./carga-perezosa/carga-perezosa.module').then(
        (m) => m.CargaPerezosaModule
      ),
  },
  {
    path: 'tailwind',
    component: TestComponent,
    loadChildren: () =>
      import('./tailwind/tailwind.module').then((m) => m.TailwindModule),
  },
  {
    path: 'angular',
    component: TestComponent,
    loadChildren: () =>
      import('./angular/angular.module').then((m) => m.AngularModule),
  },
  {
    path: 'maqueta',
    component: TestComponent,
    loadChildren: () =>
      import('./maqueta/maqueta.module').then((m) => m.MaquetaModule),
  },
  {
    path: 'legajo',
    component: TestComponent,
    loadChildren: () =>
      import('./legajo/legajo.module').then((m) => m.LegajoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule {}
