import { Component, inject } from '@angular/core';
import {
  FormsModule,
  Validators,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogExerciseData } from '../exercises-list/exercises-list.component.js';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../../../../environments/environment.js';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-exercise-dialog',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatDialogContent,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './exercise-dialog.component.html',
  styleUrl: './exercise-dialog.component.css',
})
export class ExerciseDialogComponent {
  title: string = '';
  action: string = '';

  readonly dialogRef = inject(MatDialogRef<DialogExerciseData>);
  readonly data = inject<DialogExerciseData>(MAT_DIALOG_DATA);
  exerciseForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    urlVideo: new FormControl<string>(''),
  });

  constructor(private http: HttpClient) {
    if (this.data.action == 'put') {
      this.exerciseForm.patchValue({
        name: this.data.exercise.name,
        description: this.data.exercise.description,
        urlVideo: this.data.exercise.urlVideo,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
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
            if (error.status === 400) {
              // this._snackBar.open('Error al crear la rutina', 'cerrar', {
              //   duration: 3000,
              //   panelClass: ['snackbar_error'],
              // });
              console.log(error);
            }
            return throwError(
              () => new Error(error.message || 'Error desconocido')
            );
          })
        )
        .subscribe((res: any) => {
          // this._snackBar.open('Rutina creada correctamente', 'cerrar', {
          //   duration: 3000,
          //   panelClass: ['snackbar_success'],
          // });
          console.log(res);
        });
    } else if (this.data.action == 'put') {
      this.http
        .put<any>(environment.exercisesUrl + this.data.exercise.id, {
          name,
          description,
          urlVideo,
        })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 400) {
              // this._snackBar.open('Error al crear la rutina', 'cerrar', {
              //   duration: 3000,
              //   panelClass: ['snackbar_error'],
              // });
              console.log(error);
            }
            return throwError(
              () => new Error(error.message || 'Error desconocido')
            );
          })
        )
        .subscribe((res: any) => {
          // this._snackBar.open('Rutina creada correctamente', 'cerrar', {
          //   duration: 3000,
          //   panelClass: ['snackbar_success'],
          // });
          console.log(res);
        });
    }
  }
}
