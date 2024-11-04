import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trabajador } from 'src/app/interface/trabajador';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsultaContatoService {}
