import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { IMembership } from '../core/interfaces/membership.interface.js';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { MembershipsDialogComponent } from '../memberships-dialog/memberships-dialog.component.js';
import { environment } from '../../environments/environment.js';
import { IUser } from '../core/interfaces/user.interface.js';
import { ClientsListComponent } from '../clients-list/clients-list.component';
import { IMembershipType } from '../core/interfaces/membership-type.interface.js';
import { firstValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-memberships-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    HttpClientModule,
    ClientsListComponent,
    MatIconModule,
  ],
  templateUrl: './memberships-list.component.html',
  styleUrl: './memberships-list.component.css',
})
export class MembershipsListComponent {
  memberships: IMembership[] = [];
  clients: IUser[] = [];
  types: IMembershipType[] = [];
  activeMemberships: { [clientId: string]: IMembership | null } = {};

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.getMemberships();
  }

  async getMemberships() {
    try {
      this.http.get<any>(environment.membershipsUrl).subscribe((res) => {
        this.memberships = res.data;
        this.getActiveMemberships();
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  async getClients(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(environment.clientsUrl)
      );
      this.clients = response.data;
    } catch (error: any) {
      console.log(error);
    }
  }

  getActiveMemberships() {
    const currentDate = new Date();
    this.memberships.forEach((membership) => {
      if (new Date(membership.dateTo) >= currentDate) {
        this.activeMemberships[membership.client.id] = membership;
      }
    });
  }

  async getTypes() {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(environment.membershipTypesUrl)
      );
      this.types = response.data;
    } catch (error: any) {
      console.log(error);
    }
  }

  async addMembership(): Promise<void> {
    try {
      await this.getClients();
      await this.getTypes();

      this.openDialog(MembershipsDialogComponent, {
        title: 'Nueva membresía',
        action: 'post',
        clients: this.clients,
        types: this.types,
        activeMemberships: this.activeMemberships,
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe(() => {
      this.getMemberships();
    });
  }
}
