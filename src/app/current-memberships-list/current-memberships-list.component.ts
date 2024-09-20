import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { IMembership } from '../core/interfaces/membership.interface';

@Component({
  selector: 'app-current-memberships-list',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, HttpClientModule],
  templateUrl: './current-memberships-list.component.html',
  styleUrl: './current-memberships-list.component.css',
})
export class CurrentMembershipsListComponent {
  url: string = '';
  memberships: IMembership[] = [];

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/api/memberships/currentmemberships';
    this.getMemberships();
  }

  async getMemberships() {
    try {
      this.http.get<any>(this.url).subscribe((res) => {
        this.memberships = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }
}