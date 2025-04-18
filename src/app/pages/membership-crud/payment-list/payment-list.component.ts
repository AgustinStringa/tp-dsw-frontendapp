import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { IMembership } from '../../../core/interfaces/membership.interface';
import { IPayment } from '../../../core/interfaces/payment.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { PaymentMethodEnum } from '../../../core/enums/payment-method.enum';
import { PaymentService } from '../../../core/services/payment.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css',
})
export class PaymentListComponent implements OnInit {
  @Input({ required: true }) membership!: IMembership;
  @Output() componentVisible = new EventEmitter<boolean>();

  payments: IPayment[] | null = null;

  constructor(
    private dialog: MatDialog,
    private paymentService: PaymentService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.getMembershipPayments();
  }

  getMembershipPayments() {
    this.paymentService.getByMembership(this.membership.id).subscribe({
      next: (res) => {
        this.payments = res.data;
      },
      error: () => {
        this.payments = null;
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

  updatePayment(payment: IPayment) {
    this.openDialog(PaymentDialogComponent, {
      data: {
        title: 'Modificar Pago',
        action: 'put',
        membership: this.membership,
        payment,
      },
    });
  }

  deletePayment(id: string) {
    this.openDialog(DeleteDialogComponent, {
      data: {
        id: id,
        title: 'Eliminar Pago',
        service: this.paymentService,
      },
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, data);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') {
        this.getMembershipPayments();
        if (result === 'created') {
          this.snackbarService.showSuccess('Pago registrado.');
        } else if (result === 'updated') {
          this.snackbarService.showSuccess('Pago actualizado.');
        } else if (result === 'deleted') {
          this.snackbarService.showError('Pago eliminado.');
        }
      }
    });
  }

  closeComponent() {
    this.payments = null;
    this.componentVisible.emit(false);
  }

  isPaymentEditable(p: IPayment) {
    return !Object.values(PaymentMethodEnum).includes(p.paymentMethod);
  }
}
