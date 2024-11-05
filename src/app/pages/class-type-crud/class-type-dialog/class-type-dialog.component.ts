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
import { trimValidator } from '../../../core/Functions/trim-validator';
import { NgClass } from '@angular/common';
import { SnackbarService } from '../../../services/snackbar.service';

interface DialogData {
  title: string;
  action: string;
  classType: IClassType | undefined;
  httpClient: HttpClient;
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
    NgClass,
  ],
  templateUrl: './class-type-dialog.component.html',
  styleUrl: './class-type-dialog.component.css',
})
export class ClassTypeDialogComponent {
  readonly action;
  readonly title;
  classTypeId: string | undefined;
  private http: HttpClient;
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required, trimValidator()]),
    description: new FormControl<string>(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ClassTypeDialogComponent>,
    private snackbarService: SnackbarService
  ) {
    this.http = data.httpClient;
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
        error: () => {
          this.snackbarService.showError(
            'Error al crear el tipo de clase',
            'cerrar'
          );
        },
      });
    } else if (this.action === 'put') {
      this.http
        .put<any>(environment.classTypesUrl + '/' + this.classTypeId, data)
        .subscribe({
          next: () => {
            this.closeDialog('updated');
          },
          error: () => {
            this.snackbarService.showError(
              'Error al modificar el tipo de clase',
              'cerrar'
            );
          },
        });
    }
  }

  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }
}
