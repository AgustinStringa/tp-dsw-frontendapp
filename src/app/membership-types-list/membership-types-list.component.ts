import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { IMembershipType } from '../core/interfaces/membership-type.interface';

@Component({
  selector: 'app-membership-types-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule],
  templateUrl: './membership-types-list.component.html',
  styleUrl: './membership-types-list.component.css',
})
export class MembershipTypesListComponent {
  url: string = '';
  membershipTypes: IMembershipType[] = [];

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/api/memberships/membershiptypes';
    this.getMembershipTypes();
  }

  async getMembershipTypes() {
    try {
      this.http.get<any>(this.url).subscribe((res) => {
        this.membershipTypes = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }
}
