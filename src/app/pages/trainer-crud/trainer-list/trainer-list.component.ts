import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay/index.js';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../core/interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UserDialogComponent } from '../../../user-dialog/user-dialog.component';

@Component({
  selector: 'app-trainers-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './trainer-list.component.html',
  styleUrl: './trainer-list.component.css',
})
export class TrainerListComponent {
  trainers: IUser[] | null = null;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.getTrainers();
  }

  getTrainers() {
    this.http.get<any>(environment.trainersUrl).subscribe({
      next: (res) => {
        this.trainers = res.data;
      },
      error: () => {
        this.trainers = null;
      },
    });
  }

  addTrainer(): void {
    this.openDialog(UserDialogComponent, {
      data: {
        title: 'Nuevo Entrenador',
        action: 'post',
        url: environment.trainersUrl,
      },
    });
  }

  updateTrainer(trainer: IUser): void {
    this.openDialog(UserDialogComponent, {
      data: {
        title: 'Modificar Entrenador',
        action: 'put',
        user: trainer,
        url: environment.trainersUrl,
      },
    });
  }

  deleteTrainer(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      data: {
        id: id,
        entity: 'trainer',
        title: 'Eliminar Entrenador',
        url: environment.trainersUrl,
      },
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, data);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') {
        this.getTrainers();
      }
    });
  }
}
