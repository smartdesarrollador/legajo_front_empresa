import { Injectable } from '@angular/core';
import {
  Router,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  rol_valor: any;
  constructor(private router: Router) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    if (localStorage.getItem('token_empresa')) {
      const token = localStorage.getItem('token_empresa');

      if (token) {
        try {
          const decodedToken = jwtDecode<any>(token);
          console.log('Decoded JWT:', decodedToken);

          this.rol_valor = decodedToken.rol;
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          this.router.navigate(['auth/login']);
          return false;
        }
      }

      if (this.rol_valor == 'Empleador') {
        if (token) {
          return true;
        } else {
          this.router.navigate(['auth/login']);
          return false;
        }
      } else {
        this.router.navigate(['auth/login']);
        return false;
      }
    } else {
      const tokenFromUrl = route.queryParamMap.get('token');
      console.log('Token recibido en la URL:', tokenFromUrl);

      // Verifica si el token es válido antes de decodificar
      if (tokenFromUrl) {
        try {
          const decodedToken = jwtDecode<any>(tokenFromUrl);
          console.log('Decoded JWT:', decodedToken);

          this.rol_valor = decodedToken.rol;
          localStorage.removeItem('token_empresa');
          // Almacenar el token en el localStorage

          localStorage.setItem('token_empresa', tokenFromUrl);
          console.log('Token almacenado en localStorage como token_empresa');
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          this.router.navigate(['auth/login']);
          return false;
        }
      }

      const tokenInStorage = localStorage.getItem('token_empresa');

      // Permitir acceso si el token está en la URL o en el localStorage
      if (this.rol_valor == 'Empleador') {
        if (tokenFromUrl || tokenInStorage) {
          return true;
        } else {
          this.router.navigate(['auth/login']);
          return false;
        }
      } else {
        this.router.navigate(['auth/login']);
        return false;
      }
    }

    /* if (tokenFromUrl || tokenInStorage) {
      return true;
    } else {
      this.router.navigate(['auth/login']);
      return false;
    } */
  };
}
