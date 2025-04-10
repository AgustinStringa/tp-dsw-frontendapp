import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IUserPaymentCreate,
  PaymentService,
} from '../../../core/services/payment.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IMembershipType } from '../../../core/interfaces/membership-type.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MembershipTypeService } from '../../../core/services/membership-type.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-pay-membership-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatRadioModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './pay-membership-dialog.component.html',
  styleUrl: './pay-membership-dialog.component.css',
})
export class PayMembershipDialogComponent {
  membershipTypes: IMembershipType[] | undefined;
  selectedMembershipType: IMembershipType | undefined;
  clientId: string;

  form = new FormGroup({
    membershipType: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<PayMembershipDialogComponent>,
    private authService: AuthService,
    private paymentService: PaymentService,
    private membershipTypeService: MembershipTypeService,
    private snackbarService: SnackbarService
  ) {
    this.getMembershipTypes();
    this.clientId = this.authService.getUser()!.id;
  }

  onSubmit(): void {
    const form = this.form.value;
    const data: IUserPaymentCreate = {
      clientId: this.clientId,
      membershipTypeId: form.membershipType!,
    };

    this.paymentService.startUserPayment(data).subscribe({
      next: (res) => {
        window.location.href = res;
      },
      error: (err) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else
          this.snackbarService.showError(
            'Error al iniciar la compra de la membresía.'
          );
      },
    });
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  getMembershipTypes() {
    this.membershipTypeService.getAll().subscribe({
      next: (res) => {
        this.membershipTypes = res.data;
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else
          this.snackbarService.showError(
            'Error al obtener los tipos de membresías.'
          );
      },
    });
  }

  onItemSelected(membershipType: IMembershipType) {
    this.selectedMembershipType = membershipType;
    this.form.controls.membershipType.setValue(membershipType.id);
  }
}
