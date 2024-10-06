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
  dni: string = '';
  user: string = '';
  aqua: string = '#a7ebf3';

  isLoginVisible: boolean = true;
  isSpinnerVisible: boolean = false;
  public userSignal = this.authService.userSignal;
  constructor(private router: Router, private authService: AuthService) {
    authService.getUser();
    if (authService.userSignal() != null) {
      this.router.navigate(['/home']);
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
            this.router.navigate(['/home']);
          },
          error: (error: any) => {
            this.isSpinnerVisible = false;
            console.error('Login failed:', error);
            const httperror = error as HttpErrorResponse;
            if (httperror.status == 401) {
              //email o usuario incorrecto
              //poner los controles en rojo?
            } else if (httperror.status == 500) {
              //otro tipo de error
              //snackbar?
            }
          },
        });
    } else {
      this.authService
        .register({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          dni: Number.parseInt(this.dni),
        })
        .subscribe({
          next: (response: any) => {
            console.log(response);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Register failed:', error);
          },
        });
    }
  }
}
