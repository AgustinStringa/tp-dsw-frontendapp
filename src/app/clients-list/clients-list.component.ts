import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

interface IUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css',
})
export class ClientsListComponent {
  url: string = '';
  users: IUser[] = [];
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/api/clients';
  }
  async getClients() {
    try {
      this.http.get<any>(this.url).subscribe((res) => {
        this.users.push(...res.data);
      });
    } catch (error: any) {
      console.log(error);
    }
  }
}
