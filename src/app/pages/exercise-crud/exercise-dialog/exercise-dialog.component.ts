import { Component, inject } from '@angular/core';
import {
  ExerciseService,
  IExerciseCreate,
} from '../../../core/services/exercise.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ExerciseDialogData } from '../exercise-list/exercise-list.component.js';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { trimValidator } from '../../../core/functions/trim-validator';

@Component({
  selector: 'app-exercise-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './exercise-dialog.component.html',
  styleUrl: './exercise-dialog.component.css',
})
export class ExerciseDialogComponent {
  title = '';
  action = '';
  readonly dialogRef = inject(MatDialogRef<ExerciseDialogData>);
  readonly data = inject<ExerciseDialogData>(MAT_DIALOG_DATA);

  exerciseForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, trimValidator()]),
    description: new FormControl<string>(''),
    urlVideo: new FormControl<string>(''),
  });

  constructor(
    private exerciseService: ExerciseService,
    private snackbarService: SnackbarService
  ) {
    this.title = this.data.title;
    if (this.data.action === 'put') {
      this.exerciseForm.patchValue({
        name: this.data.exercise.name.trim(),
        description: this.data.exercise.description.trim(),
        urlVideo: this.data.exercise.urlVideo.trim(),
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close('none');
  }

  onSubmit(): void {
    const formValues = this.exerciseForm.value;

    const exerciseCreate: IExerciseCreate = {
      name: formValues.name!,
      description: formValues.description!,
      urlVideo: formValues.urlVideo!,
    };

    if (this.data.action == 'post') {
      this.exerciseService.create(exerciseCreate).subscribe({
        next: () => {
          this.snackbarService.showSuccess('Ejercicio creado correctamente.');
          this.dialogRef.close('created');
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.isUserFriendly)
            this.snackbarService.showError(err.error.message);
          else this.snackbarService.showError('Error al crear el ejercicio.');
        },
      });
    } else if (this.data.action == 'put') {
      this.exerciseService
        .update(this.data.exercise.id, exerciseCreate)
        .subscribe({
          next: () => {
            this.snackbarService.showSuccess(
              'Ejercicio actualizado correctamente.'
            );
            this.dialogRef.close('updated');
          },
          error: (err: HttpErrorResponse) => {
            if (err.error.isUserFriendly)
              this.snackbarService.showError(err.error.message);
            else
              this.snackbarService.showError(
                'Error al actualizar el ejercicio.'
              );
          },
        });
    }
  }
}
