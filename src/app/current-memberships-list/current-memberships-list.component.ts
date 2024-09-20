import { Component } from '@angular/core';
import { CurrentMembership } from '../core/interfaces/current-membership.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-current-memberships-list',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, HttpClientModule],
  templateUrl: './current-memberships-list.component.html',
  styleUrl: './current-memberships-list.component.css',
})
export class CurrentMembershipsListComponent {
  url: string = '';
  memberships: CurrentMembership[] = [];

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
