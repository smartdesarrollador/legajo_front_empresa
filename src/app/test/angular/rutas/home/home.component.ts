import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private requestService: RequestService) {}

  getAllPosts() {
    this.requestService.getPosts().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
