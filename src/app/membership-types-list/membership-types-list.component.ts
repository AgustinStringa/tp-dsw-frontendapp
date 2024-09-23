import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { environment } from '../../environments/environment';
import { IMembershipType } from '../core/interfaces/membership-type.interface';

@Component({
  selector: 'app-membership-types-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule],
  templateUrl: './membership-types-list.component.html',
  styleUrl: './membership-types-list.component.css',
})
export class MembershipTypesListComponent {
  membershipTypes: IMembershipType[] = [];

  constructor(private http: HttpClient) {
    this.getMembershipTypes();
  }

  getMembershipTypes() {
    try {
      this.http.get<any>(environment.membershipTypesUrl).subscribe((res) => {
        this.membershipTypes = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }
}
