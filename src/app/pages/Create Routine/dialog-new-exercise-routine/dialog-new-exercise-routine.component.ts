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
  templateUrl: './dialog-new-exercise-routine.component.html',
  styleUrl: './dialog-new-exercise-routine.component.css',
})
export class DialogNewExerciseRoutineComponent {
  readonly dialogRef = inject(MatDialogRef<DialogNewExerciseRoutineComponent>);
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
      reps: this.exerciseRoutineForm.value.reps,
    };
  }
}
