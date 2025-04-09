import {
  ClassTypeService,
  IClassTypeCreate,
} from '../../../core/services/class-type.service';
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
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { IClassType } from '../../../core/interfaces/class-type.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgClass } from '@angular/common';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { trimValidator } from '../../../core/functions/trim-validator';

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
    FormsModule,
    MatDialogContent,
    MatButtonModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './class-type-dialog.component.html',
  styleUrl: './class-type-dialog.component.css',
})
export class ClassTypeDialogComponent {
  readonly action;
  readonly title;
  classTypeId: string | undefined;

  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required, trimValidator()]),
    description: new FormControl<string>('', [
      Validators.required,
      trimValidator(),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ClassTypeDialogComponent>,
    private classTypeService: ClassTypeService,
    private snackbarService: SnackbarService
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
    const form = this.form.controls;
    const data: IClassTypeCreate = {
      name: form.name.value!,
      description: form.description.value!,
    };

    if (this.action === 'post') {
      this.classTypeService.create(data).subscribe({
        next: () => {
          this.closeDialog('created');
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.isUserFriendly)
            this.snackbarService.showError(err.error.message);
          else
            this.snackbarService.showError('Error al crear el tipo de clase.');
        },
      });
    } else if (this.action === 'put') {
      this.classTypeService.update(this.classTypeId!, data).subscribe({
        next: () => {
          this.closeDialog('updated');
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.isUserFriendly)
            this.snackbarService.showError(err.error.message);
          else
            this.snackbarService.showError(
              'Error al modificar el tipo de clase.'
            );
        },
      });
    }
  }

  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }
}
