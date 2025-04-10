import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IProgressCreate,
  ProgressService,
} from '../../../core/services/progress.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { IProgress } from '../../../core/interfaces/progress.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../../core/services/snackbar.service';

interface DialogData {
  title: string;
  action: string;
  client: IUser;
  progress: IProgress;
}

@Component({
  selector: 'app-progress-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogTitle,
    MatNativeDateModule,
  ],
  templateUrl: './progress-dialog.component.html',
  providers: [provideNativeDateAdapter()],
})
export class ProgressDialogComponent {
  readonly title: string;
  readonly action: string;
  client: IUser;
  progressId: string | undefined;
  public form: FormGroup;
  public today: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ProgressDialogComponent>,
    private progressService: ProgressService,
    private snackbarService: SnackbarService
  ) {
    this.title = data.title;
    this.action = data.action;
    this.client = data.client;

    this.form = new FormGroup({
      date: new FormControl('', [Validators.required]),
      weight: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
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

    if (data.progress !== undefined) {
      this.progressId = data.progress.id;

      this.form.patchValue({
        date: data.progress.date,
        weight: data.progress.weight.toString(),
        fatPercentage: data.progress.fatPercentage.toString(),
        bodyMeasurements: data.progress.bodyMeasurements,
        client: this.client.id,
      });
    }
  }

  onSubmit(): void {
    if (!this.form.valid) return;

    const data: IProgressCreate = {
      date: new Date(this.form.get('date')?.value),
      weight: Number(this.form.get('weight')?.value),
      fatPercentage: Number(this.form.get('fatPercentage')?.value),
      bodyMeasurements: this.form.get('bodyMeasurements')?.value,
      clientId: this.client.id,
    };

    if (this.action === 'post') {
      this.progressService.create(data).subscribe({
        next: () => {
          this.closeDialog('created');
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error en la peticion: ', err);
          if (err.error.isUserFriendly) {
            this.snackbarService.showError(err.error.message);
          } else {
            this.snackbarService.showError('Error al crear la meta');
          }
        },
      });
    } else if (this.action === 'put') {
      this.progressService.update(this.progressId!, data).subscribe({
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
