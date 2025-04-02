import { AuthService } from '../../core/services/auth.service';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMembership } from '../../core/interfaces/membership.interface';
import { MatDialog } from '@angular/material/dialog';
import { PayMembershipDialogComponent } from '../client-payment/pay-membership-dialog/pay-membership-dialog.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public userSignal = this.authService.userSignal;
  //TODO: tipar interfaces goals, progresses
  public goals: [] = [];
  public progresses: [] = [];
  public membership: IMembership | null = null;
  public formatedDateTo: string | null = null;
  public classes: [] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private dialog: MatDialog
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
    try {
      this.http
        .get(`${environment.goalsUrl}/client/${this.userSignal()?.id}`)
        .subscribe({
          next: (res: any) => {
            this.goals = res.data;
          },
          error: (err) => {},
        });
    } catch (error) {}
  }

  getProgresses(): void {
    try {
      this.http
        .get(`${environment.progressesUrl}/client/${this.userSignal()?.id}`)
        .subscribe({
          next: (res: any) => {
            this.progresses = res.data;
          },
          error: (err) => {},
        });
    } catch (error) {}
  }

  getMembership(): void {
    this.http
      .get(`${environment.activeMembershipsUrl}/${this.userSignal()?.id}`)
      .subscribe({
        next: (res: any) => {
          this.membership = res.data;
          if (this.membership !== null) {
            const date = this.membership.dateTo;
            this.formatedDateTo = `${date.getDay() + 1}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`;
          }
        },
        error: (err) => {
          //TODO
        },
      });
  }

  getClasses(): void {
    try {
      this.http
        .get(`${environment.registrationUrl}/client/${this.userSignal()?.id}`)
        .subscribe({
          next: (res: any) => {
            this.classes = res.data;
          },
          error: (err) => {},
        });
    } catch (error) {}
  }

  openPayMembershipModal() {
    const dialogRef = this.dialog.open(PayMembershipDialogComponent);

    dialogRef.afterClosed().subscribe(() => {
      //TODO
    });
  }
}
