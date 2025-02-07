import { Component, Inject } from '@angular/core';
import { IUser } from '../../../core/interfaces/user.interface.js';
import { IProgress } from '../../../core/interfaces/progress.interface.js';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SnackbarService } from '../../../services/snackbar.service.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.js';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';

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
  styleUrl: './progress-dialog.component.css',
  providers: [provideNativeDateAdapter()],
})
export class ProgressDialogComponent {
  readonly title: string;
  readonly action: string;
  client: IUser;
  progressId: string | undefined;
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ProgressDialogComponent>,
    private snackbarService: SnackbarService,
    private http: HttpClient
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

    let data: Record<string, any> = {
      date: new Date(this.form.get('date')?.value).toISOString().split('T')[0],
      weight: Number(this.form.get('weight')?.value),
      fatPercentage: Number(this.form.get('fatPercentage')?.value),
      bodyMeasurements: this.form.get('bodyMeasurements')?.value,
      client: this.client.id,
    };

    if (this.action === 'post') {
      this.http.post<any>(environment.progressesUrl, data).subscribe({
        next: () => {
          this.closeDialog('created');
        },
        error: (error) => {
          console.error('Error en la peticion: ', error);
          this.snackbarService.showError('Error al crear la meta');
        },
      });
    } else if (this.action === 'put') {
      this.http
        .put<any>(environment.progressesUrl + '/' + this.progressId, data)
        .subscribe({
          next: () => {
            this.closeDialog('updated');
          },
          error: (error) => {
            console.error('Error en la peticion: ', error);
            this.snackbarService.showError('Error al actualizar el progreso');
          },
        });
    }
  }

  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }
}
