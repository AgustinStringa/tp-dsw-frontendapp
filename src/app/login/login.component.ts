import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  private _snackBar = inject(MatSnackBar);

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
      if (this.email.trim() == '' || this.password.trim() == '') {
        this.isSpinnerVisible = false;
        return;
      }
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

              if (httperror.error.message == 'Wrong email or password') {
                document
                  .getElementById('loginEmail')
                  ?.classList.add(
                    'is-invalid',
                    'text-danger',
                    'border-danger',
                    'border'
                  );
                document
                  .getElementById('loginPassword')
                  ?.classList.add(
                    'is-invalid',
                    'text-danger',
                    'border-danger',
                    'border'
                  );
                this._snackBar.open(
                  'Correo electrónico o contraseña incorrectos',
                  'cerrar',
                  {
                    duration: 3000,
                  }
                );
              }
            } else {
              this._snackBar.open('Error al iniciar sesión', 'cerrar', {
                duration: 3000,
              });
            }
          },
        });
    } else {
      if (
        this.email.trim() == '' ||
        this.password.trim() == '' ||
        this.firstName.trim() == '' ||
        this.lastName.trim() == '' ||
        this.dni.trim() == ''
      ) {
        this.isSpinnerVisible = false;
        return;
      }
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
            this.router.navigate(['/home']);
          },
          error: (error) => {
            //error de tipo usuario existente?
            console.error('Register failed:', error);
            this._snackBar.open('Error al crear usuario', 'cerrar', {
              duration: 3000,
            });
          },
        });
    }
  }
}
