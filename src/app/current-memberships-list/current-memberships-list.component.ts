import { Component } from '@angular/core';
import { CurrentMembership } from '../core/interfaces/current-membership.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.js';
@Component({
  selector: 'app-current-memberships-list',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, HttpClientModule],
  templateUrl: './current-memberships-list.component.html',
  styleUrl: './current-memberships-list.component.css',
})
export class CurrentMembershipsListComponent {
  memberships: CurrentMembership[] = [];

  constructor(private http: HttpClient) {
    this.getMemberships();
  }

  getMemberships() {
    try {
      this.http.get<any>(environment.currentMembershipsUrl).subscribe((res) => {
        this.memberships = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }
}
