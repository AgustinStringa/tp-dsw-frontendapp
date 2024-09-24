import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { IUser } from '../core/interfaces/user.interface';
import { AuthService } from '../services/auth.service.js';

@Component({
  selector: 'app-trainers-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule],
  templateUrl: './trainers-list.component.html',
  styleUrl: './trainers-list.component.css',
})
export class TrainersListComponent {
  url: string = '';
  trainers: IUser[] = [];

  constructor(private http: HttpClient) {
    const service = new AuthService(http);

    console.log(service.getUser());
  }

  async getTrainers() {
    try {
      this.http.get<any>(environment.trainersUrl).subscribe((res) => {
        this.trainers = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }
}
