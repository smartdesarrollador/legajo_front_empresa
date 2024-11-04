import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  FormContacto: any = FormGroup;
  UrlEmail: string = environment.apiUrlEmail;
  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private Toastr: ToastrService
  ) {
    this.FormContacto = this.fb.group({
      nombre: [''],
    });
  }
  EnviarEmail() {
    var formData: any = new FormData();
    formData.append('nombre', this.FormContacto.get('nombre').value);
    this.http.post(this.UrlEmail, formData).subscribe(
      (response) => {
        console.log(response);
        this.Toastr.success('Email enviado Exitosamente');
      },
      (error) => {
        console.log(error);
        this.Toastr.error('No se pudo enviar el email');
      }
    );
  }

  alerta() {
    alert('enviado correctamente');
  }
}
