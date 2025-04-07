import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { ExerciseDialogComponent } from '../exercise-dialog/exercise-dialog.component';
import { ExerciseService } from '../../../core/services/exercise.service';
import { FormsModule } from '@angular/forms';
import { IExercise } from '../../../core/interfaces/exercise.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../../core/services/snackbar.service';

export interface ExerciseDialogData {
  exercise: IExercise;
  action: string;
  title: string;
}

@Component({
  selector: 'app-exercises-list',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './exercise-list.component.html',
  styleUrls: [
    './exercise-list.component.css',
    '../../../../assets/styles/filter-container.css',
  ],
})
export class ExerciseListComponent {
  exercises: IExercise[] | null = null;
  filteredExercises: IExercise[] | null = null;
  nameFilter = '';
  descriptionFilter = '';

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
        this.filteredExercises = [...res.data];
      },
      error: () => {
        this.exercises = null;
      },
    });
  }

  clearFilters() {
    this.nameFilter = '';
    this.descriptionFilter = '';
    this.applyFilter();
  }

  applyFilter() {
    if (!this.exercises) {
      this.filteredExercises = null;
      return;
    }

    this.filteredExercises = [...this.exercises];

    if (this.nameFilter) {
      const searchTerm = this.nameFilter.toLowerCase();
      this.filteredExercises = this.filteredExercises.filter((e) =>
        e.name.toLowerCase().includes(searchTerm)
      );
    }

    if (this.descriptionFilter) {
      const searchTerm = this.descriptionFilter.toLowerCase();
      this.filteredExercises = this.filteredExercises.filter((e) =>
        e.description?.toLowerCase().includes(searchTerm)
      );
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
