import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component.js';
import { environment } from '../../../../environments/environment.js';
import { ExerciseDialogComponent } from '../exercise-dialog/exercise-dialog.component.js';
import { IExercise } from '../../../core/interfaces/exercise.interface.js';
import { SnackbarService } from '../../../services/snackbar.service.js';

export interface DialogExerciseData {
  exercise: IExercise;
  action: string;
  title: string;
  httpClient: HttpClient;
  url: string;
}

@Component({
  selector: 'app-exercises-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css',
})
export class ExerciseListComponent {
  exercises: IExercise[] | null = null;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    public snackbarService: SnackbarService
  ) {
    this.getExercises();
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, data);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') {
        this.getExercises();
      }
    });
  }

  getExercises() {
    try {
      this.http.get<any>(environment.exercisesUrl).subscribe((res) => {
        this.exercises = res.data;
      });
    } catch (error: any) {
      this.exercises = null;
      console.log(error);
    }
  }

  updateExercise(e: IExercise): void {
    this.openDialog(ExerciseDialogComponent, {
      data: {
        exercise: e,
        title: 'Modificar Ejercicio',
        action: 'put',
      },
    });
  }

  addExercise(): void {
    this.openDialog(ExerciseDialogComponent, {
      data: {
        title: 'Nuevo Ejercicio',
        action: 'post',
      },
    });
  }

  deleteExercise(id: string | undefined): void {
    this.openDialog(DeleteDialogComponent, {
      data: {
        id: id,
        title: 'Eliminar Ejercicio',
        url: environment.exercisesUrl,
      },
    });
  }
}
