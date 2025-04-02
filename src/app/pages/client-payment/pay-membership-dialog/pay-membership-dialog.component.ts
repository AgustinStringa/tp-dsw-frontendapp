import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IMembershipType } from '../../../core/interfaces/membership-type.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { PaymentService } from '../../../core/services/payment.service';

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
  form = new FormGroup({
    membershipType: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<PayMembershipDialogComponent>,
    private authService: AuthService,
    private paymentService: PaymentService,
    private snackbarService: SnackbarService
  ) {
    this.getMembershipTypes();
  }

  onSubmit(): void {
    const form = this.form.controls;
    const data: Record<string, any> = {
      clientId: this.authService.getUser()?.id,
      membershipTypeId: form.membershipType.value,
    };

    this.http.post<any>(environment.userPaymentUrl, data).subscribe({
      next: (res) => {
        window.location.href = res;
      },
      error: (err) => {
        this.snackbarService.showError(err.error.message);
      },
    });
  }

  closeDialog(result: string) {
    this.dialogRef.close(result); //TODO
  }

  //TODO hacerlo service??
  getMembershipTypes() {
    this.http.get<any>(environment.membershipTypesUrl).subscribe({
      next: (res) => {
        this.membershipTypes = res.data;
      },
      error: () => {
        this.snackbarService.showError(
          'Error al obtener los tipos de membresías'
        );
      },
    });
  }

  onItemSelected(membershipType: IMembershipType) {
    this.selectedMembershipType = membershipType;
    this.form.controls.membershipType.setValue(membershipType.id);
  }
}
