import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { GoalDialogComponent } from '../goal-dialog/goal-dialog.component';
import { HttpClient } from '@angular/common/http';
import { IGoal } from '../../../core/interfaces/goal.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-goal-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.css',
})
export class GoalListComponent {
  userSignal = this.authService.userSignal;
  goals: IGoal[] = [];
  userId: string = '';
  client: IUser | undefined | null;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    const user = this.authService.getUser();
    if (user?.isClient) {
      this.client = user;
      this.getClientGoals();
    } else {
      console.error('No user found in session.');
    }
  }

  getClientGoals() {
    const userId = this.userSignal()?.id;
    if (!userId) {
      console.error('ID de usuario no encontrado');
      return;
    }

    this.http
      .get<any>(`${environment.goalsUrl}/client/${this.userSignal()?.id}`)
      .subscribe({
        next: (res) => {
          this.goals = res.data;
        },
        error: (err) => {
          console.error('Error al obtener metas: ', err);
          this.goals = [];
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
      url: environment.goalsUrl,
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
    this.http
      .put(environment.goalsUrl + '/' + g.id, { done: g.done })
      .subscribe({
        next: () => console.log('Estado de meta actualizado'),
        error: (err) => console.error('Error al actualizar meta: ', err),
      });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') this.getClientGoals();
    });
  }
}
