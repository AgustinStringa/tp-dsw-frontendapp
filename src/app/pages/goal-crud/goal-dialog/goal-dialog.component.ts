import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  GoalService,
  IGoalCreate,
} from '../../../core/services/goal.service.js';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { IGoal } from '../../../core/interfaces/goal.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { SnackbarService } from '../../../core/services/snackbar.service';

interface DialogData {
  title: string;
  action: string;
  client: IUser;
  goal: IGoal | undefined;
}

@Component({
  selector: 'app-goal-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogActions,
  ],
  templateUrl: './goal-dialog.component.html',
  styleUrl: './goal-dialog.component.css',
})
export class GoalDialogComponent {
  readonly title: string;
  readonly action: string;
  client: IUser;
  goalId: string | undefined;
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<GoalDialogComponent>,
    private snackbarService: SnackbarService,
    private goalService: GoalService
  ) {
    this.title = data.title;
    this.action = data.action;
    this.client = data.client;

    this.form = new FormGroup({
      fatPercentage: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      bodyMeasurements: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      client: new FormControl(this.client.id, [Validators.required]),
    });

    if (data.goal !== undefined) {
      this.goalId = data.goal.id;

      this.form.patchValue({
        fatPercentage: data.goal.fatPercentage.toString(),
        bodyMeasurements: data.goal.bodyMeasurements,
        client: this.client.id,
      });
    }
  }

  onSubmit(): void {
    if (!this.form.valid) return;

    const data: IGoalCreate = {
      done: this.data.goal?.done || false,
      fatPercentage: Number(this.form.get('fatPercentage')?.value),
      bodyMeasurements: this.form.get('bodyMeasurements')?.value?.trim(),
      clientId: this.client.id,
    };

    if (this.action === 'post') {
      this.goalService.create(data).subscribe({
        next: () => {
          this.closeDialog('created');
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.isUserFriendly) {
            this.snackbarService.showError(err.error.message);
          } else {
            this.snackbarService.showError('Error al crear la meta');
          }
        },
      });
    } else if (this.action === 'put') {
      this.goalService.update(this.goalId!, data).subscribe({
        next: () => {
          this.closeDialog('updated');
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.isUserFriendly) {
            this.snackbarService.showError(err.error.message);
          } else {
            this.snackbarService.showError('Error al actualizar la meta');
          }
        },
      });
    }
  }

  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }
}
