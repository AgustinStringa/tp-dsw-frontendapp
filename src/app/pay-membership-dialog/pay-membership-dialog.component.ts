import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AuthService } from '../core/services/auth.service';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMembershipType } from '../core/interfaces/membership-type.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { SnackbarService } from '../core/services/snackbar.service';

@Component({
  selector: 'app-pay-membership-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatListModule,
    MatRadioModule,
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
    private snackbarService: SnackbarService,
    private http: HttpClient,
    private authService: AuthService
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
  }
}
