import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminComponent,
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'contratacion',
    component: AdminComponent,
    loadChildren: () =>
      import('./contratacion/contratacion.module').then(
        (m) => m.ContratacionModule
      ),
  },
  {
    path: 'configuracion',
    component: AdminComponent,
    loadChildren: () =>
      import('./configuracion/configuracion.module').then(
        (m) => m.ConfiguracionModule
      ),
  },
  {
    path: 'test',
    component: AdminComponent,
    loadChildren: () => import('./test/test.module').then((m) => m.TestModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
