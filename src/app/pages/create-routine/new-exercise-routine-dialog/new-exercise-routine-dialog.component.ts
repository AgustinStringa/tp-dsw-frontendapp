import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogData } from '../create-routine-page/create-routine-page.component.js';
import { IExercise } from '../../../core/interfaces/exercise.interface.js';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-new-exercise-routine',
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
  ],
  templateUrl: './new-exercise-routine-dialog.component.html',
})
export class NewExerciseRoutineDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewExerciseRoutineDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  exerciseRoutineForm = new FormGroup({
    exercise: new FormControl<IExercise | null>(null, Validators.required),
    series: new FormControl<number>(1, Validators.required),
    reps: new FormControl<number>(1, Validators.required),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  returnValues() {
    return {
      exerciseSelected: this.exerciseRoutineForm.value.exercise,
      series: this.exerciseRoutineForm.value.series,
      repetitions: this.exerciseRoutineForm.value.reps,
    };
  }
}
