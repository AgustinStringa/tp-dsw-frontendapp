import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '../core/interfaces/user.interface';

@Component({
  selector: 'app-client-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './client-dialog.component.html',
  styleUrl: './client-dialog.component.css',
})
export class ClientDialogComponent {
  title: string = '';
  action: string = '';
  clientId: string | undefined;

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dni: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{8}$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; action: string; client: IUser },
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    private http: HttpClient
  ) {
    this.title = data.title;
    this.action = data.action;

    if (data.client !== undefined) {
      const form = this.form.controls;
      this.clientId = data.client.id;

      form.firstName.setValue(data.client.firstName);
      form.lastName.setValue(data.client.lastName);
      form.dni.setValue(data.client.dni);
      form.email.setValue(data.client.email);
      form.password.disable();
    }
  }

  onSubmit(): void {
    let data: Record<string, any> = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      dni: this.form.get('dni')?.value,
      email: this.form.get('email')?.value,
    };

    if (this.form.controls.password.enabled === true)
      data['password'] = this.form.get('password')?.value;

    if (this.action === 'post') {
      try {
        this.http.post<any>('//localhost:3000/api/clients', data).subscribe();
        this.closeModal();
      } catch (error: any) {
        console.log(error);
      }
    } else if (this.action === 'put') {
      try {
        this.http
          .put<any>('//localhost:3000/api/clients/' + this.clientId, data)
          .subscribe();
        this.closeModal();
      } catch (error: any) {
        console.log(error);
      }
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
