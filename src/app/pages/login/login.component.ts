import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, ILogin } from '../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IUserCreate } from '../../core/services/trainer.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { SnackbarService } from '../../core/services/snackbar.service';
import { trimValidator } from '../../core/functions/trim-validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, MatProgressSpinnerModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      trimValidator(),
      Validators.minLength(4),
    ]),
    //TODO 2 veces password
    firstName: new FormControl<string>('', [
      Validators.required,
      trimValidator(),
    ]),
    lastName: new FormControl('', [Validators.required, trimValidator()]),
    dni: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{7,8}$/),
    ]),
  });

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

  showLabel(
    control: AbstractControl<string | null, string | null> | null
  ): 1 | 0 {
    if (control?.value === null || control?.value.length === 0) return 1;
    return 0;
  }

  login() {
    const form = this.loginForm.value;

    const data: ILogin = { email: form.email!, password: form.password! };

    this.authService.login(data).subscribe({
      next: () => {
        this.isSpinnerVisible = false;
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        this.isSpinnerVisible = false;

        const httperror = error as HttpErrorResponse;
        if (httperror.status == 401) {
          //email o usuario incorrecto
          //poner los controles en rojo?

          if (httperror.error.message == 'Email y/o contraseña incorrectos.') {
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
  }

  register() {
    const form = this.registerForm.value;

    const data: IUserCreate = {
      email: form.email!,
      password: form.password!,
      firstName: form.firstName!,
      lastName: form.lastName!,
      dni: form.dni!,
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else this.snackbarService.showError('Error al registrarse.');
      },
    });
  }

  toggleView() {
    if (this.isLoginVisible) this.loginForm.reset();
    else this.registerForm.reset();

    this.isLoginVisible = !this.isLoginVisible;
  }

  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  // Getters para FormControls
  get loginEmail() {
    return this.loginForm.get('email');
  }

  get loginPassword() {
    return this.loginForm.get('password');
  }

  get registerFirstName() {
    return this.registerForm.get('firstName');
  }

  get registerLastName() {
    return this.registerForm.get('lastName');
  }

  get registerDni() {
    return this.registerForm.get('dni');
  }

  get registerEmail() {
    return this.registerForm.get('email');
  }

  get registerPassword() {
    return this.registerForm.get('password');
  }
}
