import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaquetaRoutingModule } from './maqueta-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OfertaLaboralComponent } from './contratacion/oferta-laboral/oferta-laboral.component';
import { ContratoComponent } from './contratacion/contrato/contrato.component';
import { AdendasComponent } from './contratacion/adendas/adendas.component';
import { SelectComponent } from './componentes/form/select/select.component';
import { IndicatorsComponent } from './componentes/indicators/indicators.component';
import { ProcesoUnoComponent } from './contratacion/contrato/proceso-uno/proceso-uno.component';
/* import { MaquetaComponent } from './maqueta.component'; */

@NgModule({
  declarations: [
    /* MaquetaComponent */ DashboardComponent,
    OfertaLaboralComponent,
    ContratoComponent,
    AdendasComponent,
    SelectComponent,
    IndicatorsComponent,
    ProcesoUnoComponent,
  ],
  imports: [CommonModule, MaquetaRoutingModule],
})
export class MaquetaModule {}
