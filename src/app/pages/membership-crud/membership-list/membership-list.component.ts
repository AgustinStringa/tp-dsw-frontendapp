import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { IMembership } from '../../../core/interfaces/membership.interface';
import { IMembershipType } from '../../../core/interfaces/membership-type.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MembershipDialogComponent } from '../membership-dialog/membership-dialog.component';
import { MembershipFilterComponent } from '../membership-filter/membership-filter.component';
import { MembershipService } from '../../../core/services/membership.service';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { PaymentListComponent } from '../payment-list/payment-list.component';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-membership-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    PaymentListComponent,
    MembershipFilterComponent,
  ],
  templateUrl: './membership-list.component.html',
})
export class MembershipListComponent {
  memberships: IMembership[] | null = null;
  outstandingMemberships: IMembership[] | null = null;
  filteredMemberships: IMembership[] | null = null;
  clients: IUser[] = [];
  types: IMembershipType[] = [];
  activeMemberships: Record<string, IMembership | null> = {};
  showPayments = false;
  selectedMembership: IMembership | null = null;

  constructor(
    private dialog: MatDialog,
    private membershipService: MembershipService,
    private snackbarService: SnackbarService
  ) {
    this.getActiveMemberships();
    this.getOutstandingMemberships();
  }

  getActiveMemberships() {
    this.membershipService.getActive().subscribe({
      next: (res) => {
        this.memberships = res.data;
        this.filteredMemberships = res.data;
      },
      error: () => {
        this.memberships = null;
        this.filteredMemberships = null;
      },
    });
  }

  getOutstandingMemberships() {
    this.membershipService.getOutstanding().subscribe({
      next: (res) => {
        this.outstandingMemberships = res.data;
      },
      error: () => {
        this.outstandingMemberships = null;
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') {
        this.getActiveMemberships();
        this.getOutstandingMemberships();
        if (result === 'created') {
          if (dialogRef.componentInstance instanceof PaymentDialogComponent) {
            this.snackbarService.showSuccess('Pago registrado.');
          } else {
            this.snackbarService.showSuccess('Membresía creada.');
          }
        } else if (result === 'updated') {
          this.snackbarService.showSuccess('Membresía actualizada.');
        } else if (result === 'deleted') {
          this.snackbarService.showError('Membresía eliminada.');
        }
      }
    });
  }

  onFilteredMemberships(filteredMemberships: IMembership[]) {
    this.filteredMemberships = filteredMemberships;
  }

  hidePaymentList(event: boolean) {
    this.showPayments = event;
    this.getActiveMemberships();
    this.getOutstandingMemberships();
  }
}
