import { GoalService, IGoalCreate } from '../../../core/services/goal.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { FormsModule } from '@angular/forms';
import { GoalDialogComponent } from '../goal-dialog/goal-dialog.component';
import { GoalsSummaryComponent } from '../goals-summary/goals-summary.component';
import { HttpErrorResponse } from '@angular/common/http';
import { IGoal } from '../../../core/interfaces/goal.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-goal-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, GoalsSummaryComponent],
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.css',
})
export class GoalListComponent {
  userSignal = this.authService.userSignal;
  goals: IGoal[] = [];
  userId: string = '';
  client: IUser | undefined | null;
  achievedGoalsCount = 0;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private goalService: GoalService,
    private snackbarService: SnackbarService
  ) {
    const user = this.authService.getUser();
    if (user?.isClient) {
      this.client = user;
      this.getClientGoals();
    }
  }

  getClientGoals() {
    const userId = this.userSignal()?.id;
    if (!userId) return;

    this.goalService.getByClientId(userId).subscribe({
      next: (res) => {
        this.goals = res.data;
        this.goals.forEach((g) => {
          if (g.done) {
            this.achievedGoalsCount += 1;
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        this.goals = [];
        if (err.error.isUserFriendly) {
          this.snackbarService.showError(err.error.message);
        } else {
          this.snackbarService.showError('Error al obtener las metas.');
        }
      },
    });
  }

  addGoal(): void {
    this.openDialog(GoalDialogComponent, {
      title: 'Nueva Meta',
      action: 'post',
      client: this.client,
    });
  }

  deleteGoal(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      service: this.goalService,
      title: 'Eliminar Meta',
    });
  }

  updateGoal(g: IGoal): void {
    this.openDialog(GoalDialogComponent, {
      title: 'Modificar Meta',
      action: 'put',
      client: this.client,
      goal: g,
    });
  }

  toggleGoalDone(g: IGoal): void {
    if (!this.client?.id) return;
    const data: IGoalCreate = {
      done: g.done,
      bodyMeasurements: g.bodyMeasurements,
      fatPercentage: g.fatPercentage,
      clientId: this.client?.id!,
    };
    this.goalService.update(g.id, data).subscribe({
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly) {
          this.snackbarService.showError(err.error.message);
        } else {
          this.snackbarService.showError('Error al actualizar la meta');
        }
      },
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') this.getClientGoals();
    });
  }
}
