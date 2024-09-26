import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../environments/environment';
import { IUser } from '../core/interfaces/user.interface';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
  templateUrl: './client-dialog.component.html',
  styleUrl: './client-dialog.component.css',
})
export class ClientDialogComponent {
  title: string = '';
  action: string = '';
  clientId: string | undefined;
  url: string = '';

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
    public data: { title: string; action: string; client: IUser; url: string },
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    private http: HttpClient
  ) {
    this.title = data.title;
    this.action = data.action;
    this.url = data.url;

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
      dni: String(this.form.get('dni')?.value),
      email: this.form.get('email')?.value,
    };

    if (this.form.controls.password.enabled === true)
      data['password'] = this.form.get('password')?.value;

    if (this.action === 'post') {
      try {
        this.http.post<any>(this.url, data).subscribe((info) => {
          this.dialogRef.close('created');
        });
      } catch (error: any) {
        console.log(error);
      }
    } else if (this.action === 'put') {
      try {
        this.http
          .put<any>(this.url + '/' + this.clientId, data)
          .subscribe((info) => {
            this.dialogRef.close('updated');
          });
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}
