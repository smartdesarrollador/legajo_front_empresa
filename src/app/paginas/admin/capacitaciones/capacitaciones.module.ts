import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapacitacionesRoutingModule } from './capacitaciones-routing.module';
import { ObligatoriasComponent } from './obligatorias/obligatorias.component';
import { RecomendadasComponent } from './recomendadas/recomendadas.component';


@NgModule({
  declarations: [
    ObligatoriasComponent,
    RecomendadasComponent
  ],
  imports: [
    CommonModule,
    CapacitacionesRoutingModule
  ]
})
export class CapacitacionesModule { }
