import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/login/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Empleador } from 'src/app/interface/interface/registro-empleador';
import { RegistroEmpleadorService } from 'src/app/services/services/registro-empleador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userData: any;
  user_id: any;
  form: FormGroup;
  submitted = false;
  data: any;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private empleadorService: RegistroEmpleadorService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.dataService.login(this.form.value).subscribe((res) => {
      this.data = res;
      /* console.log(res); */
      if (this.data.status === 1) {
        this.token = this.data.data.token;
        /* localStorage.setItem('token', this.token); */
        // Cambiado aquí
        this.userData = jwtDecode(this.token);

        this.user_id = this.userData.user_id;

        localStorage.setItem('id_user', this.user_id);

        // Obtener el empleador usando el id_user
        this.empleadorService.getEmpleadorByUserId(this.user_id).subscribe({
          next: (empleador) => {
            // Guardar el token y el id_empleador en localStorage
            localStorage.setItem('token_empresa', this.token);
            localStorage.setItem(
              'id_empleador',
              empleador.id_empleador.toString()
            );
            localStorage.setItem('nombre_empleador', empleador.empleador);

            this.router.navigate(['/admin/dashboard']);
          },
          error: (error) => {
            this.toastr.error(
              'Error al obtener información del empleador',
              'Error',
              {
                timeOut: 2000,
                progressBar: true,
              }
            );
          },
        });
      } else if (this.data.status === 0) {
        this.toastr.error(
          JSON.stringify(this.data.message),
          JSON.stringify(this.data.code),
          {
            timeOut: 2000,
            progressBar: true,
          }
        );
      }
    });
  }
}
