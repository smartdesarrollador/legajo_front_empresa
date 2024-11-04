import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoContrato } from '../interface/tipo-contrato';
import { environment } from '../../environments/environment'; // Importa environment

@Injectable({
  providedIn: 'root',
})
export class TipoContratoService {
  private apiUrl = `${environment.apiBaseUrl}/tipos_contrato`; // Usa la URL del environment

  constructor(private http: HttpClient) {}

  getTiposContrato(): Observable<TipoContrato[]> {
    return this.http.get<TipoContrato[]>(this.apiUrl);
  }
}
