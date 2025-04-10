import {
  ClientService,
  IClientSelfUpdate,
} from '../../core/services/client.service';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ICrudService } from '../../core/interfaces/crud-service.interface';
import { IUser } from '../../core/interfaces/user.interface';
import { IUserCreate } from '../../core/services/trainer.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { passwordMatchValidator } from '../../core/functions/password-match.validator';
import { SnackbarService } from '../../core/services/snackbar.service';
import { trimValidator } from '../../core/functions/trim-validator';

interface DialogData {
  title: string;
  action: string;
  user: IUser | undefined;
  crudService: ICrudService<unknown, unknown>;
}

@Component({
  selector: 'app-client-dialog',
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
  templateUrl: './user-dialog.component.html',
})
export class UserDialogComponent {
  title: string;
  action: string;
  userId: string | undefined;
  crudService: ICrudService<unknown, unknown>;

  form = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required, trimValidator()]),
      lastName: new FormControl('', [Validators.required, trimValidator()]),
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{7,8}$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    },
    { validators: passwordMatchValidator }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: DialogData,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private snackbarService: SnackbarService
  ) {
    this.title = dialogData.title;
    this.action = dialogData.action;
    this.crudService = dialogData.crudService;

    if (dialogData.user !== undefined) {
      const form = this.form.controls;

      this.userId = dialogData.user.id;
      form.password.removeValidators(Validators.required);
      form.confirmPassword.removeValidators(Validators.required);

      form.firstName.setValue(dialogData.user.firstName);
      form.lastName.setValue(dialogData.user.lastName);
      form.dni.setValue(dialogData.user.dni);
      form.email.setValue(dialogData.user.email);

      if (dialogData.action === 'patch') {
        form.firstName.clearValidators();
        form.firstName.disable();
        form.lastName.clearValidators();
        form.lastName.disable();
        form.dni.clearValidators();
        form.dni.disable();
      }
    }
  }

  onSubmit(): void {
    if (this.action === 'post' || this.action === 'put') {
      this.sendFullUpdate();
    } else if (this.action === 'patch') {
      this.sendPartialUpdate();
    }
  }

  sendFullUpdate() {
    const form = this.form.value;

    const data: IUserCreate = {
      firstName: form.firstName!,
      lastName: form.lastName!,
      dni: form.dni!.toString(),
      email: form.email!,
    };

    if (form.password !== '') data['password'] = form.password!;

    if (this.action === 'post') {
      this.crudService.create(data).subscribe({
        next: () => {
          this.closeDialog('created');
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.isUserFriendly)
            this.snackbarService.showError(err.error.message);
          else this.snackbarService.showError('Error al crear el usuario.');
        },
      });
    } else if (this.action === 'put') {
      this.crudService.update(this.userId!, data).subscribe({
        next: () => {
          this.closeDialog('updated');
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.isUserFriendly)
            this.snackbarService.showError(err.error.message);
          else this.snackbarService.showError('Error al modificar el usuario.');
        },
      });
    }
  }

  sendPartialUpdate() {
    // El único patch que se utiliza es cuando el cliente modifica sus datos.
    const form = this.form.value;

    const data: IClientSelfUpdate = {
      email: form.email!,
      password: form.password !== '' ? form.password! : undefined,
    };

    const clientService = this.crudService as ClientService;

    clientService.selfUpdate(this.userId!, data).subscribe({
      next: () => {
        this.closeDialog('updated');
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else this.snackbarService.showError('Error al modificar sus datos.');
      },
    });
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  // Getters para FormControls
  get formControl() {
    return this.form;
  }

  get dni() {
    return this.form.get('dni');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
}
