import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import IExercise from '../../../core/interfaces/IExercise.interface.js';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component.js';
import { environment } from '../../../../environments/environment.js';
import { ExerciseDialogComponent } from '../exercise-dialog/exercise-dialog.component.js';
export interface DialogExerciseData {
  exercise: IExercise;
  action: string;
  title: string;
}

@Component({
  selector: 'app-exercises-list',
  standalone: true,
  imports: [HttpClientModule, MatIconModule],
  templateUrl: './exercises-list.component.html',
  styleUrl: './exercises-list.component.css',
})
export class ExercisesListComponent {
  exercises: IExercise[] | undefined = [];
  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.getExercises();
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe(() => {
      this.getExercises();
    });
  }

  getExercises() {
    try {
      this.http.get<any>(environment.exercisesUrl).subscribe((res) => {
        this.exercises = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  editExercise(e: IExercise): void {
    this.openDialog(ExerciseDialogComponent, {
      exercise: e,
      title: 'Editar ejercicio',
      action: 'put',
    });
  }

  addExercise(): void {
    this.openDialog(ExerciseDialogComponent, {
      title: 'Crear ejercicio',
      action: 'post',
    });
  }

  removeExercise(id: string | undefined): void {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      title: 'Eliminar ejercicio',
      url: environment.exercisesUrl,
    });
  }
}
