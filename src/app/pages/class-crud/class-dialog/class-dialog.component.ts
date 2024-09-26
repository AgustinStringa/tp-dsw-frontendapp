import { Component, Inject } from '@angular/core';
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
import { ClassTypeDialogComponent } from '../../class-type-crud/class-type-dialog/class-type-dialog.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IClass } from '../../../core/interfaces/class.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../../environments/environment';
import { IClassType } from '../../../core/interfaces/class-type.interface';
import { IUser } from '../../../core/interfaces/user.interface';

interface DialogData {
  title: string;
  action: string;
  trainers: IUser[];
  classTypes: IClassType[];
  class: IClass | undefined;
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
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    maxCapacity: new FormControl<string>('', [Validators.required]),
    location: new FormControl<string>('', [Validators.required]),
    classType: new FormControl<string>('', [Validators.required]),
    trainer: new FormControl<string>('', [Validators.required]),
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

    if (data.class !== undefined) {
      const form = this.form.controls;
      this.classId = data.class.id;

      //form..setValue(data.classType.name);
      //form.description.setValue(data.classType.description);
      //setear los valores a modificar
    }
  }

  onSubmit(): void {
    let data: Record<string, any> = {
      //name: this.form.get('name')?.value,
      //description: this.form.get('description')?.value,
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
