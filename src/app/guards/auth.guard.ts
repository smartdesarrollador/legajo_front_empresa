import { Injectable } from '@angular/core';
import {
  Router,
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Empleador } from 'src/app/interface/interface/registro-empleador';
import { RegistroEmpleadorService } from 'src/app/services/services/registro-empleador.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  rol_valor: any;
  id_user: any;
  constructor(
    private router: Router,
    private empleadorService: RegistroEmpleadorService
  ) {}

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
          localStorage.setItem('id_user', decodedToken.user_id);
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
          localStorage.setItem('id_user', decodedToken.user_id);
          this.rol_valor = decodedToken.rol;
          localStorage.removeItem('token_empresa');
          // Almacenar el token en el localStorage

          localStorage.setItem('token_empresa', tokenFromUrl);
          console.log('Token almacenado en localStorage como token_empresa');
          this.empleadorService
            .getEmpleadorByUserId(decodedToken.user_id)
            .subscribe({
              next: (empleador) => {
                // Guardar el token y el id_empleador en localStorage

                localStorage.setItem(
                  'id_empleador',
                  empleador.id_empleador.toString()
                );
                localStorage.setItem('nombre_empleador', empleador.empleador);
              },
            });
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
