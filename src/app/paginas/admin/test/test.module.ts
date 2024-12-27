import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { ListarEmpleadorComponent } from './listar-empleador/listar-empleador.component';
import { GenerateWordComponent } from './generate-word/generate-word.component';
import { GenerateWordFormatosComponent } from './generate-word-formatos/generate-word-formatos.component';


@NgModule({
  declarations: [
    ListarEmpleadorComponent,
    GenerateWordComponent,
    GenerateWordFormatosComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
