import User from '../core/interfaces/user.interface';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-trainers-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule],
  templateUrl: './trainers-list.component.html',
  styleUrl: './trainers-list.component.css',
})
export class TrainersListComponent {
  url: string = '';
  trainers: User[] = [];

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/api/trainers';
  }

  async getTrainers() {
    try {
      this.http.get<any>(this.url).subscribe((res) => {
        this.trainers = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }
}
