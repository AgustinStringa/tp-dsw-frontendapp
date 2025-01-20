import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../../environments/environment.js';
import { IMembership } from '../../core/interfaces/membership.interface.js';
import { AuthService } from '../../services/auth.service.js';
import { EmailSentDialogComponent } from '../../email-sent-dialog/email-sent-dialog.component.js';
import { SnackbarService } from '../../services/snackbar.service.js';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatProgressSpinnerModule, NgClass],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  readonly emailSentDialog = inject(MatDialog);
  public userSignal = this.authService.userSignal;
  //TODO: tipar interfaces goals, progresses
  public goals: [] = [];
  public progresses: [] = [];
  public membership: IMembership | null = null;
  public classes: [] = [];
  public membershipDateTo: Date | null = null;
  public isSpinnerVisible: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {
    authService.getUser();
    if (this.userSignal()?.isClient) {
      this.getProgresses();
      this.getGoals();
      this.getClasses();
      this.getMembership();
    }
  }

  getGoals(): void {
    this.http
      .get(`${environment.goalsUrl}/client/${this.userSignal()?.id}`)
      .subscribe({
        next: (res: any) => {
          this.goals = res.data;
        },
        error: (err) => {},
      });
  }

  getProgresses(): void {
    this.http
      .get(`${environment.progressesUrl}/client/${this.userSignal()?.id}`)
      .subscribe({
        next: (res: any) => {
          this.progresses = res.data;
        },
        error: (err) => {},
      });
  }

  getMembership(): void {
    this.http
      .get(`${environment.membershipsUrl}/active/${this.userSignal()?.id}`)
      .subscribe({
        next: (res: any) => {
          this.membership = res.data;
          if (this.membership?.dateTo != null) {
            this.membershipDateTo = new Date(this.membership.dateTo);
          }
        },
        error: (err) => {},
      });
  }

  getClasses(): void {
    this.http
      .get(`${environment.registrationUrl}/client/${this.userSignal()?.id}`)
      .subscribe({
        next: (res: any) => {
          this.classes = res.data;
        },
        error: (err) => {},
      });
  }

  showModalEmailSent(): void {
    this.isSpinnerVisible = true;
    this.http.get(`${environment.authUrl}/request-change-password`).subscribe({
      next: (res: any) => {
        console.log(res);
        const dialogRef = this.emailSentDialog.open(EmailSentDialogComponent, {
          data: { email: this.userSignal()?.email || 'notemail' },
        });
        dialogRef.afterClosed().subscribe((_) => {
          this.isSpinnerVisible = false;
        });
      },
      error: (err) => {
        this.isSpinnerVisible = false;
        this.snackbarService.showError('Error al enviar la solicitud');
      },
    });
  }
}
