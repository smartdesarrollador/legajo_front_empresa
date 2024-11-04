import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LegajoRoutingModule } from './legajo-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LegajoRoutingModule, HttpClientModule],
})
export class LegajoModule {}
