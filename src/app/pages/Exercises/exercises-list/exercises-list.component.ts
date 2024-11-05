import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component.js';
import { environment } from '../../../../environments/environment.js';
import { ExerciseDialogComponent } from '../exercise-dialog/exercise-dialog.component.js';
import { IExercise } from '../../../core/interfaces/exercise.interface.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
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
  imports: [HttpClientModule, MatIconModule],
  templateUrl: './exercises-list.component.html',
  styleUrl: './exercises-list.component.css',
})
export class ExercisesListComponent {
  exercises: IExercise[] | null = null;
  private _snackBar = inject(MatSnackBar);

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.getExercises();
  }

  openShackBar(message: string, action: string, type: string): void {
    this._snackBar.open(message, action, {
      duration: 1500,
      panelClass: type === 'error' ? 'snackbar_error' : 'snackbar_success',
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

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
      exercise: e,
      title: 'Editar ejercicio',
      action: 'put',
      httpClient: this.http,
      url: environment.exercisesUrl,
    });
  }

  addExercise(): void {
    this.openDialog(ExerciseDialogComponent, {
      title: 'Crear ejercicio',
      action: 'post',
      httpClient: this.http,
      url: environment.exercisesUrl,
    });
  }

  deleteExercise(id: string | undefined): void {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      title: 'Eliminar ejercicio',
      url: environment.exercisesUrl,
      httpClient: this.http,
    });
  }
}
