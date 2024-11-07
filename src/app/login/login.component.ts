import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http/index.js';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service.js';
import { SnackbarService } from '../services/snackbar.service.js';

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
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {
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
          next: () => {
            this.isSpinnerVisible = false;
            this.router.navigate(['/home']);
          },
          error: (error: any) => {
            this.isSpinnerVisible = false;

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
                this.snackbarService.showError(
                  'Correo electrónico o contraseña incorrectos'
                );
              }
            } else {
              this.snackbarService.showError('Error al iniciar sesión');
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
          next: () => {
            this.router.navigate(['/home']);
          },
          error: (error) => {
            //TODO mostrar si el error se debe a que ya se usó el correo
            this.snackbarService.showError('Error al crear usuario');
          },
        });
    }
  }

  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
