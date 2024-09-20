import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { IUser } from '../core/interfaces/user.interface';

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

  constructor(private http: HttpClient) {}

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
