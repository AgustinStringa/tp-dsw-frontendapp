import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IUser } from '../core/interfaces/user.interface';
import { trimValidator } from '../core/Functions/trim-validator';

interface DialogData {
  title: string;
  action: string;
  user: IUser | undefined;
  url: string;
}

@Component({
  selector: 'app-client-dialog',
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
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css',
})
export class UserDialogComponent {
  title: string;
  action: string;
  userId: string | undefined;
  url: string;

  form = new FormGroup({
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
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private http: HttpClient
  ) {
    this.title = data.title;
    this.action = data.action;
    this.url = data.url;

    if (data.user !== undefined) {
      const form = this.form.controls;
      this.userId = data.user.id;

      form.firstName.setValue(data.user.firstName);
      form.lastName.setValue(data.user.lastName);
      form.dni.setValue(data.user.dni);
      form.email.setValue(data.user.email);
      form.password.removeValidators(Validators.required);
    }
  }

  onSubmit(): void {
    const form = this.form.controls;
    let data: Record<string, any> = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      dni: form.dni.value?.toString(),
      email: form.email.value,
    };

    if (form.password.value !== '') data['password'] = form.password.value;

    if (this.action === 'post') {
      this.http.post<any>(this.url, data).subscribe({
        next: () => {
          this.closeDialog('created');
        },
        error: () => {
          console.error('Error al crear el usuario');
        },
      });
    } else if (this.action === 'put') {
      this.http.put<any>(this.url + '/' + this.userId, data).subscribe({
        next: () => {
          this.closeDialog('updated');
        },
        error: (error) => {
          console.log('Error al modificar el usuario' + error);
        },
      });
    }
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }
}
