import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { IUser } from '../core/interfaces/user.interface';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay/index.js';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component.js';

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

  async getTrainers() {
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

    dialogRef.afterClosed().subscribe(() => {
      //TO DO: hay forma de saber si no hubo cambios? para no realizar la peticion
      this.getTrainers();
    });
  }

  deleteTrainer(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      entity: 'trainer',
      title: 'Eliminar entrenador',
      url: environment.trainersUrl,
    });
  }

  updateTrainer(trainer: IUser): void {
    this.openDialog(ClientDialogComponent, {
      title: 'Modificar entrenador',
      action: 'put',
      client: trainer,
      url: environment.trainersUrl,
    });
  }

  addTrainer(): void {
    this.openDialog(ClientDialogComponent, {
      title: 'Nuevo entrenador',
      action: 'post',
      url: environment.trainersUrl,
    });
  }
}
