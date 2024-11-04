import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../interface/area';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private apiUrl = `${environment.apiBaseUrl}/areas`; // Usa la URL del environment

  constructor(private http: HttpClient) {}

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl);
  }
}
