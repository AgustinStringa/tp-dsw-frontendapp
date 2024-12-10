import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service.js';
import { environment } from '../../../environments/environment.js';
import { IMembership } from '../../core/interfaces/membership.interface.js';
import { OneRepMaxCalculatorComponent } from '../one-rep-max-calculator/one-rep-max-calculator.component.js';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [OneRepMaxCalculatorComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  readonly dialog = inject(MatDialog);
  public userSignal = this.authService.userSignal;
  //TODO: tipar interfaces goals, progresses
  public goals: [] = [];
  public progresses: [] = [];
  public membership: IMembership | null = null;
  public classes: [] = [];
  public membershipDateTo: Date | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
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
    try {
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
    } catch (error) {}
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

  calculateOneRepMax(): void {
    this.openDialog(OneRepMaxCalculatorComponent, {});
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog);
  }

  calculateIMLG(): void {
    alert('Acá se calculará el Índice de Masa Libre de Grasa (IMLG).');
  }
}
