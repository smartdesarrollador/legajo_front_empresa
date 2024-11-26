import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { ListarEmpleadorComponent } from './listar-empleador/listar-empleador.component';


@NgModule({
  declarations: [
    ListarEmpleadorComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
