import { Component, Inject } from '@angular/core';
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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IClassType } from '../../../core/interfaces/class-type.interface';

interface DialogData {
  title: string;
  action: string;
  classType: IClassType | undefined;
}

@Component({
  selector: 'app-class-type-dialog',
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
  templateUrl: './class-type-dialog.component.html',
  styleUrl: './class-type-dialog.component.css',
})
export class ClassTypeDialogComponent {
  readonly action;
  readonly title;
  classTypeId: string | undefined;

  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ClassTypeDialogComponent>,
    private http: HttpClient
  ) {
    this.action = data.action;
    this.title = data.title;

    if (data.classType !== undefined) {
      const form = this.form.controls;
      this.classTypeId = data.classType.id;

      form.name.setValue(data.classType.name);
      form.description.setValue(data.classType.description);
    }
  }

  onSubmit(): void {
    let data: Record<string, any> = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
    };

    if (this.action === 'post') {
      this.http.post<any>(environment.classTypesUrl, data).subscribe({
        next: () => {
          this.closeDialog('created');
        },
        error: (error) => {
          console.error('Error en la petición:', error);
        },
      });
    } else if (this.action === 'put') {
      this.http
        .put<any>(environment.classTypesUrl + '/' + this.classTypeId, data)
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
