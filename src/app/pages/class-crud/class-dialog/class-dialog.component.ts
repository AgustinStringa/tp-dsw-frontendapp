import { Component, Inject } from '@angular/core';
import { ClassTypeDialogComponent } from '../../class-type-crud/class-type-dialog/class-type-dialog.component';
import { environment } from '../../../../environments/environment';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IClass } from '../../../core/interfaces/class.interface';
import { IClassType } from '../../../core/interfaces/class-type.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { trimValidator } from '../../../core/functions/trim-validator';

interface DialogData {
  title: string;
  action: string;
  trainers: IUser[];
  classTypes: IClassType[];
  class_a: IClass | undefined;
}

@Component({
  selector: 'app-class-dialog',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogActions,
    FormsModule,
    MatDialogContent,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './class-dialog.component.html',
  styleUrl: './class-dialog.component.css',
})
export class ClassDialogComponent {
  readonly action;
  readonly title;
  readonly trainers: IUser[];
  readonly classTypes: IClassType[];
  classId: string | undefined;

  form = new FormGroup({
    day: new FormControl<string>('', [Validators.required]),
    startTime: new FormControl<string>('', [Validators.required]),
    endTime: new FormControl<string>('', [Validators.required]),
    maxCapacity: new FormControl<number | null>(null, [Validators.required]),
    location: new FormControl<string>('', [
      Validators.required,
      trimValidator(),
    ]),
    classType: new FormControl<string>('', [Validators.required]),
    trainer: new FormControl<string>('', [Validators.required]),
    active: new FormControl<boolean>(true, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ClassTypeDialogComponent>,
    private http: HttpClient
  ) {
    this.action = data.action;
    this.title = data.title;
    this.trainers = data.trainers;
    this.classTypes = data.classTypes;

    if (data.class_a !== undefined) {
      const form = this.form.controls;
      this.classId = data.class_a.id;

      form.day.setValue(data.class_a.day.toString());
      form.startTime.setValue(data.class_a.startTime);
      form.endTime.setValue(data.class_a.endTime);
      form.maxCapacity.setValue(data.class_a.maxCapacity);
      form.location.setValue(data.class_a.location);
      form.classType.setValue(data.class_a.classType.id);
      form.trainer.setValue(data.class_a.trainer.id);
      form.active.setValue(data.class_a.active);
    }
  }

  onSubmit(): void {
    const form = this.form.controls;
    let data: Record<string, any> = {
      day: Number(form.day.value),
      startTime: form.startTime.value,
      endTime: form.endTime.value,
      maxCapacity: form.maxCapacity.value,
      location: form.location.value,
      classType: form.classType.value,
      trainer: form.trainer.value,
      active: form.active.value,
    };

    if (this.action === 'post') {
      this.http.post<any>(environment.classesUrl, data).subscribe({
        next: () => {
          this.closeDialog('created');
        },
        error: (error) => {
          console.error('Error en la petición:', error);
        },
      });
    } else if (this.action === 'put') {
      this.http
        .put<any>(environment.classesUrl + '/' + this.classId, data)
        .subscribe({
          next: () => {
            this.closeDialog('updated');
          },
          error: (error) => {
            console.error('Error en la petición:', error);
          },
        });
    }
  }

  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }
}
