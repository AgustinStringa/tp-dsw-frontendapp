import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay/index.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { environment } from '../../environments/environment';
import { IUser } from '../core/interfaces/user.interface';
import { UserDialogComponent } from '../user-dialog/user-dialog.component.js';

@Component({
  selector: 'app-trainers-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule, MatIconModule],
  templateUrl: './trainers-list.component.html',
  styleUrl: './trainers-list.component.css',
})
export class TrainersListComponent {
  trainers: IUser[] | null = null;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.getTrainers();
  }

  getTrainers() {
    try {
      this.http.get<any>(environment.trainersUrl).subscribe((res) => {
        //TO DO: NO TRAER CONTRASEÑAS
        this.trainers = res.data;
      });
    } catch (error: any) {
      this.trainers = null;
      console.log(error);
    }
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') {
        this.getTrainers();
      }
    });
  }

  deleteTrainer(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      entity: 'trainer',
      title: 'Eliminar Entrenador',
      url: environment.trainersUrl,
    });
  }

  updateTrainer(trainer: IUser): void {
    this.openDialog(UserDialogComponent, {
      title: 'Modificar Entrenador',
      action: 'put',
      user: trainer,
      url: environment.trainersUrl,
    });
  }

  addTrainer(): void {
    this.openDialog(UserDialogComponent, {
      title: 'Nuevo Entrenador',
      action: 'post',
      url: environment.trainersUrl,
    });
  }
}
