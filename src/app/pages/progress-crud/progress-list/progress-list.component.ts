import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { IProgress } from '../../../core/interfaces/progress.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProgressChartComponent } from '../progress-chart/progress-chart.component';
import { ProgressDialogComponent } from '../progress-dialog/progress-dialog.component';
import { ProgressService } from '../../../core/services/progress.service';
import { SnackbarService } from '../../../core/services/snackbar.service.js';

@Component({
  selector: 'app-progress-list',
  standalone: true,
  imports: [MatIconModule, CommonModule, ProgressChartComponent],
  templateUrl: './progress-list.component.html',
  styleUrl: './progress-list.component.css',
})
export class ProgressListComponent {
  userSignal = this.authService.userSignal;
  progresses: IProgress[] = [];
  userId: string = '';
  client: IUser | undefined | null;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private progressService: ProgressService,
    private snackbarService: SnackbarService
  ) {
    const user = this.authService.getUser();
    if (user?.isClient) {
      this.client = user;
      this.getClientProgresses();
    } else {
      console.error('No user found in session.');
    }
  }

  getClientProgresses() {
    const userId = this.client?.id;
    if (!userId) return;

    this.progressService.getByClientId(userId).subscribe({
      next: (res) => {
        this.progresses = res.data;
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else this.snackbarService.showError('Error al obtener los progresos.');
      },
    });
  }

  addProgress(): void {
    this.openDialog(ProgressDialogComponent, {
      title: 'Nuevo Progreso',
      action: 'post',
      client: this.client,
    });
  }

  updateProgress(p: IProgress): void {
    this.openDialog(ProgressDialogComponent, {
      title: 'Modificar Progreso',
      action: 'put',
      client: this.client,
      progress: p,
    });
  }

  deleteProgress(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      service: this.progressService,
      title: 'Eliminar progreso',
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe((res) => {
      if (res !== 'none') this.getClientProgresses();
    });
  }
}
