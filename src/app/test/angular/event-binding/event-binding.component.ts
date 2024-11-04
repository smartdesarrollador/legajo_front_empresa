import { Component } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.css']
})
export class EventBindingComponent {

  numero: number = 1;

  decrementar(){
    this.numero--;
  
  }

  incrementar(){
    this.numero+=2;
  }

}




