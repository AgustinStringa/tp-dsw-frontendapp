import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service.js';
import { HttpErrorResponse } from '@angular/common/http/index.js';
import {
  ProgressSpinnerMode,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  dni: number = 0;
  user: string = '';
  aqua: string = '#a7ebf3';

  isLoginVisible: boolean = true;
  isSpinnerVisible: boolean = false;
  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.getUser() != null) {
      this.router.navigate(['/registration']);
    }
  }

  isFieldEmpty(fieldName: string): boolean {
    return (this as any)[fieldName].length === 0;
  }

  onSubmit(): void {
    this.isSpinnerVisible = true;
    if (this.isLoginVisible) {
      this.authService
        .login({ email: this.email, password: this.password })
        .subscribe({
          next: (response: any) => {
            this.isSpinnerVisible = false;
            console.log(response);
            this.router.navigate(['/create-routine']);
          },
          error: (error: any) => {
            this.isSpinnerVisible = false;
            console.error('Login failed:', error);
            const httperror = error as HttpErrorResponse;
            if (httperror.status == 404) {
              //email o usuario incorrecto
              //poner los controles en rojo?
            } else if (httperror.status == 500) {
              //otro tipo de error
            }
          },
        });
    } else {
      this.authService
        .register({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastname: this.lastName,
          dni: this.dni,
        })
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.router.navigate(['/create-routine']);
          },
          error: (error) => {
            console.error('Login failed:', error);
          },
        });
    }
  }
}
