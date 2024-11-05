import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component.js';
import { environment } from '../../../../environments/environment.js';
import { ExerciseDialogComponent } from '../exercise-dialog/exercise-dialog.component.js';
import { IExercise } from '../../../core/interfaces/exercise.interface.js';

export interface DialogExerciseData {
  exercise: IExercise;
  action: string;
  title: string;
}

@Component({
  selector: 'app-exercises-list',
  standalone: true,
  imports: [HttpClientModule, MatIconModule],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css',
})
export class ExerciseListComponent {
  exercises: IExercise[] | null = null;
  constructor(private http: HttpClient, private dialog: MatDialog) {
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
        title: 'Editar ejercicio',
        action: 'put',
        httpClient: this.http,
      },
    });
  }

  addExercise(): void {
    this.openDialog(ExerciseDialogComponent, {
      data: {
        title: 'Crear ejercicio',
        action: 'post',
        httpClient: this.http,
      },
    });
  }

  deleteExercise(id: string | undefined): void {
    this.openDialog(DeleteDialogComponent, {
      data: {
        id: id,
        title: 'Eliminar ejercicio',
        url: environment.exercisesUrl,
        httpClient: this.http,
      },
    });
  }
}
