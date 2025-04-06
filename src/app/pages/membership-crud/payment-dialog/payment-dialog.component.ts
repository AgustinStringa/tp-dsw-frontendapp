import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IPaymentCreate,
  PaymentService,
} from '../../../core/services/payment.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { IMembership } from '../../../core/interfaces/membership.interface';
import { IPayment } from '../../../core/interfaces/payment.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PaymentMethodEnum } from '../../../core/enums/payment-method.enum';
import { SnackbarService } from '../../../core/services/snackbar.service';

interface DialogData {
  title: string;
  action: string;
  membership: IMembership;
  payment: IPayment;
}

@Component({
  selector: 'app-payment-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './payment-dialog.component.html',
  styleUrl: './payment-dialog.component.css',
})
export class PaymentDialogComponent {
  title: string;
  action: string;
  membership: IMembership;
  paymentId: string | undefined;

  paymentMethods = Object.values(PaymentMethodEnum);

  form = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
      Validators.min(0.01),
      Validators.pattern(/^\d+(\.\d{1,2})?$/),
    ]),
    paymentMethod: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    private snackbarService: SnackbarService,
    private paymentService: PaymentService
  ) {
    this.title = data.title;
    this.action = data.action;
    this.membership = data.membership;

    if (data.payment !== undefined) {
      const form = this.form.controls;
      this.paymentId = data.payment.id;

      form.amount.setValue(data.payment.amount.toString());
      form.paymentMethod.setValue(data.payment.paymentMethod);
    }
  }

  onSubmit(): void {
    const form = this.form.controls;

    const data: IPaymentCreate = {
      amount: Number(form.amount.value),
      membershipId: this.membership.id,
      paymentMethod: form.paymentMethod.value as PaymentMethodEnum,
    };

    if (this.action === 'post') {
      this.paymentService.create(data).subscribe({
        next: () => {
          this.closeDialog('created');
        },
        error: (err) => {
          if (err.error.isUserFriendly)
            this.snackbarService.showError(err.error.message);
          else this.snackbarService.showError('Error al registrar el pago.');
        },
      });
    } else if (this.action === 'put') {
      this.paymentService.update(this.paymentId!, data).subscribe({
        next: () => {
          this.closeDialog('updated');
        },
        error: (err) => {
          if (err.error.isUserFriendly)
            this.snackbarService.showError(err.error.message);
          else this.snackbarService.showError('Error al actualizar el pago.');
        },
      });
    }
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  // Getters para FormControls
  get amount() {
    return this.form.get('amount');
  }
}
