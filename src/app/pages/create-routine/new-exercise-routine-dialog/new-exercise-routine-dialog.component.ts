import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
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
import { DialogData } from '../create-routine-page/create-routine-page.component.js';
import { IExercise } from '../../../core/interfaces/exercise.interface.js';
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
  styleUrl: './new-exercise-routine-dialog.component.css',
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
