import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogExerciseData } from '../exercise-list/exercise-list.component.js';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.js';
import { trimValidator } from '../../../core/functions/trim-validator.js';
import { SnackbarService } from '../../../core/services/snackbar.service.js';

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
  readonly dialogRef = inject(MatDialogRef<DialogExerciseData>);
  readonly data = inject<DialogExerciseData>(MAT_DIALOG_DATA);

  exerciseForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, trimValidator()]),
    description: new FormControl<string>(''),
    urlVideo: new FormControl<string>(''),
  });

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {
    this.title = this.data.title;
    if (this.data.action == 'put') {
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
    const name = this.exerciseForm.value.name;
    const description = this.exerciseForm.value.description;
    const urlVideo = this.exerciseForm.value.urlVideo;
    //TODO: ver más validaciones aquí

    if (this.data.action == 'post') {
      this.http
        .post<any>(environment.exercisesUrl, {
          name,
          description,
          urlVideo,
        })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.snackbarService.showError('Error al crear el ejercicio');

            return throwError(
              () => new Error(error.message || 'Error desconocido')
            );
          })
        )
        .subscribe((res: any) => {
          this.snackbarService.showSuccess('Ejercicio creado correctamente');
          this.dialogRef.close('created');
        });
    } else if (this.data.action == 'put') {
      this.http
        .put<any>(environment.exercisesUrl + '/' + this.data.exercise.id, {
          name,
          description,
          urlVideo,
        })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.snackbarService.showError('Error al actualizar el ejercicio');

            return throwError(
              () => new Error(error.message || 'Error desconocido')
            );
          })
        )
        .subscribe(() => {
          this.snackbarService.showSuccess(
            'Ejercicio actualizado correctamente'
          );
          this.dialogRef.close('updated');
        });
    }
  }
}
