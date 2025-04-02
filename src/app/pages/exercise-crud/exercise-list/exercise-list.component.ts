import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { ExerciseDialogComponent } from '../exercise-dialog/exercise-dialog.component';
import { ExerciseService } from '../../../core/services/exercise.service';
import { HttpClient } from '@angular/common/http';
import { IExercise } from '../../../core/interfaces/exercise.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../../core/services/snackbar.service';

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
    private dialog: MatDialog,
    private exerciseService: ExerciseService,
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
    this.exerciseService.getAll().subscribe({
      next: (res) => {
        this.exercises = res.data;
      },
      error: () => {
        this.exercises = null;
      },
    });
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

  deleteExercise(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      data: {
        id: id,
        title: 'Eliminar Ejercicio',
        service: this.exerciseService,
      },
    });
  }
}
