import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { environment } from '../../environments/environment';
import { IMembershipType } from '../core/interfaces/membership-type.interface';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-membership-types-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule, MatIconModule],
  templateUrl: './membership-types-list.component.html',
  styleUrl: './membership-types-list.component.css',
})
export class MembershipTypesListComponent {
  membershipTypes: IMembershipType[] | null = [];

  constructor(private http: HttpClient) {
    this.getMembershipTypes();
  }

  getMembershipTypes() {
    try {
      this.http.get<any>(environment.membershipTypesUrl).subscribe((res) => {
        this.membershipTypes = res.data;
      });
    } catch (error: any) {
      this.membershipTypes = null;
      console.log(error);
    }
  }
  addMembershipType(): void {}
  updateMembershipType(): void {}
  deleteMembershipType(): void {}
}
