import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearContratoComponent } from './crear-contrato/crear-contrato.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CrearContratoComponent],
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  exports: [CrearContratoComponent],
})
export class ContratoModule {}
