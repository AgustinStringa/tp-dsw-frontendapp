import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgClass, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  dni = '';
  user = '';
  aqua = '#a7ebf3';

  isLoginVisible = true;
  isSpinnerVisible = false;
  public userSignal = this.authService.userSignal;

  constructor(
    private router: Router,
    public authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  async ngOnInit() {
    if (this.authService.getUser() !== null) {
      this.router.navigate(['/home']);
    } else {
      if (await this.authService.extendSession())
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

              if (
                httperror.error.message == 'Email y/o contraseña incorrectos.'
              ) {
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
          error: (error: any) => {
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
