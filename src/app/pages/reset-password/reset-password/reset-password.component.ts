import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { trimValidator } from '../../../core/Functions/trim-validator.js';
import { environment } from '../../../../environments/environment.js';
import { AuthService } from '../../../services/auth.service.js';
import { SnackbarService } from '../../../services/snackbar.service.js';
import { PasswordUpdatedDialogComponent } from '../password-updated-dialog/password-updated-dialog.component.js';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnChanges {
  @Input('token') token: string = '';
  readonly emailSentDialog = inject(MatDialog);
  public formError: boolean = false;
  public resetPasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      trimValidator,
      Validators.minLength(1),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      trimValidator,
      Validators.minLength(1),
    ]),
  });
  public tokenValidationError: boolean = false;
  public userSignal = this.authService.userSignal;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['token'] && changes['token'].currentValue) {
      this.validateToken();
    }
  }

  validateToken(): void {
    try {
      this.http
        .post(`${environment.authUrl}/validate-password-token`, {
          rawToken: this.token,
        })
        .subscribe({
          next: (res: any) => {
            this.tokenValidationError = false;
            this.authService.setUser(res.data);
          },
          error: (err: any) => {
            this.tokenValidationError =
              err.status === 404 || err.status === 401;
          },
        });
    } catch (error: any) {}
  }

  santizeInput(): void {
    this.resetPasswordForm.patchValue({
      password: this.resetPasswordForm.value.password?.trim(),
      confirmPassword: this.resetPasswordForm.value.confirmPassword?.trim(),
    });
  }

  checkForm(): void {
    this.santizeInput();
    this.formError =
      !this.resetPasswordForm.valid ||
      this.resetPasswordForm.value.password !==
        this.resetPasswordForm.value.confirmPassword;
    const newPassword = this.resetPasswordForm.value.password;
    if (newPassword) {
      this.updatePassword(newPassword);
    }
  }

  updatePassword(newPassword: string): void {
    try {
      if (this.formError) return;

      const userId = this.userSignal()?.id;

      this.http
        .patch(`${environment.clientsUrl}/${userId}`, {
          password: newPassword,
        })
        .subscribe({
          next: (res: any) => {
            this.resetPasswordForm.reset();
            this.showSuccessDialog();
          },
          error: (err: any) => {
            this.snackbarService.showError('Error al actualizar contraseña');
          },
        });
    } catch (error: any) {}
  }

  showSuccessDialog(): void {
    const dialogRef = this.emailSentDialog.open(PasswordUpdatedDialogComponent);
    dialogRef.afterClosed().subscribe((_) => {
      this.redirect();
    });
  }

  redirect(): void {
    this.router.navigate(['/']);
  }
}
