import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component.js';
import { IMembership } from '../../../core/interfaces/membership.interface.js';
import { IMembershipType } from '../../../core/interfaces/membership-type.interface.js';
import { IUser } from '../../../core/interfaces/user.interface.js';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MembershipDialogComponent } from '../membership-dialog/membership-dialog.component.js';
import { MembershipService } from '../../../core/services/membership.service.js';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component.js';
import { PaymentListComponent } from '../payment-list/payment-list.component.js';

@Component({
  selector: 'app-membership-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, PaymentListComponent],
  templateUrl: './membership-list.component.html',
  styleUrl: './membership-list.component.css',
})
export class MembershipListComponent {
  memberships: IMembership[] | null = null;
  clients: IUser[] = [];
  types: IMembershipType[] = [];
  activeMemberships: Record<string, IMembership | null> = {};
  showPayments = false;
  selectedMembership: IMembership | null = null;

  constructor(
    private dialog: MatDialog,
    private membershipService: MembershipService
  ) {
    this.getActiveMemberships();
  }

  getActiveMemberships() {
    this.membershipService.getActive().subscribe({
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
      },
    });
  }

  addPayment(membership: IMembership) {
    this.openDialog(PaymentDialogComponent, {
      data: {
        title: 'Nuevo Pago',
        action: 'post',
        membership,
      },
    });
  }

  listPayments(membership: IMembership) {
    this.selectedMembership = membership;
    this.showPayments = true;
  }

  updateMembership(membership: IMembership) {
    this.openDialog(MembershipDialogComponent, {
      data: {
        title: 'Modificar Membresía',
        action: 'put',
        membership: membership,
      },
    });
  }

  deleteMembership(id: string) {
    this.openDialog(DeleteDialogComponent, {
      data: {
        id: id,
        title: 'Eliminar Membresía',
        service: this.membershipService,
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
