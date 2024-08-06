import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

interface IUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-trainers-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule],
  templateUrl: './trainers-list.component.html',
  styleUrl: './trainers-list.component.css'
})
export class TrainersListComponent {
  url: string = '';
  users: IUser[] = [];
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/api/trainers';
  }
  async getTrainers() {
    try {
      this.http.get<any>(this.url).subscribe((res) => {
        this.users.push(...res.data);
      });
    } catch (error: any) {
      console.log(error);
    }
  }
}
