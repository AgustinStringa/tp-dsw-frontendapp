import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MembershipDialogComponent } from '../membership-dialog/membership-dialog.component.js';
import { NgFor, NgIf } from '@angular/common';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component.js';
import { environment } from '../../../../environments/environment.js';
import { IMembership } from '../../../core/interfaces/membership.interface.js';
import { IMembershipType } from '../../../core/interfaces/membership-type.interface.js';
import { IUser } from '../../../core/interfaces/user.interface.js';
import { SnackbarService } from '../../../services/snackbar.service.js';

@Component({
  selector: 'app-membership-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, HttpClientModule, MatIconModule],
  templateUrl: './membership-list.component.html',
  styleUrl: './membership-list.component.css',
})
export class MembershipListComponent {
  memberships: IMembership[] | null = null;
  clients: IUser[] = [];
  types: IMembershipType[] = [];
  activeMemberships: { [clientId: string]: IMembership | null } = {};

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {
    this.getActiveMemberships();
  }

  getActiveMemberships() {
    this.http.get<any>(environment.membershipsUrl).subscribe({
      //TODO trae todas las membresías, no las vigentes.
      next: (res) => {
        this.memberships = res.data;
      },
      error: () => {
        this.memberships = null;
      },
    });
  }

  addMembership() {
    this.openDialog(MembershipDialogComponent, {
      data: {
        title: 'Nueva Membresía',
        action: 'post',
        http: this.http,
      },
    });
  }

  updateMembership(membership: IMembership) {
    this.openDialog(MembershipDialogComponent, {
      data: {
        title: 'Modificar Membresía',
        action: 'put',
        http: this.http,
        membership: membership,
      },
    });
  }

  deleteMembership(id: string) {
    this.openDialog(DeleteDialogComponent, {
      data: {
        id: id,
        title: 'Eliminar Membresía',
        url: environment.membershipsUrl,
      },
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, data);

    dialogRef.afterClosed().subscribe(() => {
      this.getActiveMemberships();
    });
  }
}
