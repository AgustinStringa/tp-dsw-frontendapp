import { Component } from '@angular/core';
import { IProgress } from '../../../core/interfaces/progress.interface.js';
import { IUser } from '../../../core/interfaces/user.interface.js';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service.js';
import { environment } from '../../../../environments/environment.js';
import { ComponentType } from '@angular/cdk/portal';
import { ProgressDialogComponent } from '../progress-dialog/progress-dialog.component.js';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component.js';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-list',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './progress-list.component.html',
  styleUrl: './progress-list.component.css',
})
export class ProgressListComponent {
  userSignal = this.authService.userSignal;
  progresses: IProgress[] = [];
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
      this.getClientProgresses();
    } else {
      console.error('No user found in session.');
    }
  }

  getClientProgresses() {
    const userId = this.client?.id;
    if (!userId) {
      console.error('ID de usuario no encontrado.');
    }

    this.http
      .get<any>(environment.progressesUrl + '/client/' + this.userSignal()?.id)
      .subscribe({
        next: (res) => {
          this.progresses = res.data;
        },
        error: (err) => {
          console.error('Error al obtener progresos: ', err);
          this.progresses = [];
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
      url: environment.progressesUrl,
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
