import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.title = data.title;
    this.action = data.action;
  }

  onSubmit(): void {
    const data = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    };

    if (this.action === 'post') {
      try {
        this.http.post<any>('//localhost:3000/api/clients', data).subscribe();
        this.dialogRef.close();
      } catch (error: any) {
        console.log(error);
      }
    } else if (this.action === '') {
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
