import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IMembershipTypeCreate,
  MembershipTypeService,
} from '../../../core/services/membership-type.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { IMembershipType } from '../../../core/interfaces/membership-type.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { trimValidator } from '../../../core/functions/trim-validator';

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
    description: new FormControl('', [
      Validators.required,
      trimValidator(),
      Validators.minLength(1),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public dialogRef: MatDialogRef<MembershipTypeDialogComponent>,
    private membershipTypeService: MembershipTypeService,
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
    const data: IMembershipTypeCreate = {
      name: form.name.value!,
      description: form.description.value!.trim()!,
      price: Number(form.price.value),
    };

    if (this.action === 'post') {
      this.membershipTypeService.create(data).subscribe({
        next: () => {
          this.closeDialog('created');
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.isUserFriendly)
            this.snackbarService.showError(err.error.message);
          else
            this.snackbarService.showError(
              'Error al crear el tipo de membresía.'
            );
        },
      });
    } else if (this.action === 'put') {
      this.membershipTypeService
        .update(this.membershipTypeId!, data)
        .subscribe({
          next: () => {
            this.closeDialog('updated');
          },
          error: (err: HttpErrorResponse) => {
            if (err.error.isUserFriendly)
              this.snackbarService.showError(err.error.message);
            else
              this.snackbarService.showError(
                'Error al modificar el tipo de membresía.'
              );
          },
        });
    }
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }
}
