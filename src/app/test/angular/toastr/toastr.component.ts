import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.css'],
})
export class ToastrComponent {
  constructor(private Toastr: ToastrService) {}

  alerta(): void {
    this.Toastr.success('hola');
  }
}
