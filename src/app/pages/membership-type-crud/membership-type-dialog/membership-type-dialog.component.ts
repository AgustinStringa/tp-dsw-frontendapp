import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IMembershipType } from '../../../core/interfaces/membership-type.interface.js';
import { environment } from '../../../../environments/environment.js';
import { SnackbarService } from '../../../services/snackbar.service.js';

interface DialogData {
  title: string;
  action: string;
  membershipType: IMembershipType | undefined;
}

@Component({
  selector: 'app-membership-type-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
  ],
  templateUrl: './membership-type-dialog.component.html',
  styleUrl: './membership-type-dialog.component.css',
})
export class MembershipTypeDialogComponent {
  title: string;
  action: string;
  membershipTypeId: string | undefined;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public dialogRef: MatDialogRef<MembershipTypeDialogComponent>,
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {
    this.title = data.title;
    this.action = data.action;

    if (data.membershipType !== undefined) {
      const form = this.form.controls;
      this.membershipTypeId = data.membershipType.id;

      form.name.setValue(data.membershipType.name);
      form.description.setValue(data.membershipType.description);
      form.price.setValue(data.membershipType.price.toString());
    }
  }

  onSubmit(): void {
    const form = this.form.controls;
    let data: Record<string, any> = {
      name: form.name.value,
      description: form.description.value,
      price: Number(form.price.value),
    };

    if (this.action === 'post') {
      this.http.post<any>(environment.membershipTypesUrl, data).subscribe({
        next: () => {
          this.closeDialog('created');
        },
        error: () => {
          this.snackbarService.showError(
            'Error al crear el tipo de membresía',
            'cerrar'
          );
        },
      });
    } else if (this.action === 'put') {
      this.http
        .put<any>(
          environment.membershipTypesUrl + '/' + this.membershipTypeId,
          data
        )
        .subscribe({
          next: () => {
            this.closeDialog('updated');
          },
          error: () => {
            this.snackbarService.showError(
              'Error al modificar el tipo de membresía',
              'cerrar'
            );
          },
        });
    }
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }
}
