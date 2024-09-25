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
import { DialogMembershipTypeData } from '../membership-types-list/membership-types-list.component.js';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment.js';
import { trimValidator } from '../../../core/Functions/trim-validator.js';

@Component({
  selector: 'app-membership-type-dialog',
  standalone: true,
  imports: [
    FormsModule,
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
  templateUrl: './membership-type-dialog.component.html',
  styleUrl: './membership-type-dialog.component.css',
})
export class MembershipTypeDialogComponent {
  title: string = '';
  action: string = '';
  private _snackBar = inject(MatSnackBar);
  readonly dialogRef = inject(MatDialogRef<DialogMembershipTypeData>);
  readonly data = inject<DialogMembershipTypeData>(MAT_DIALOG_DATA);

  membershipTypeForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.nullValidator,
      Validators.minLength(1),
      trimValidator(),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.nullValidator,
      Validators.minLength(1),
      trimValidator(),
    ]),
    price: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
  });

  constructor(private http: HttpClient) {
    if (this.data.action == 'put') {
      this.membershipTypeForm.patchValue({
        name: this.data.membershipType.name.trim(),
        description: this.data.membershipType.description.trim(),
        price: Number(this.data.membershipType.price),
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close('none');
  }

  onSubmit(): void {
    const name = this.membershipTypeForm.value.name;
    const description = this.membershipTypeForm.value.description;
    const price = Number(this.membershipTypeForm.value.price);
    if (this.data.action == 'post') {
      this.http
        .post<any>(environment.membershipTypesUrl, {
          name,
          description,
          price,
        })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 400) {
              this._snackBar.open(
                'Error al crear el tipo de membresía',
                'cerrar',
                {
                  duration: 3000,
                  panelClass: ['snackbar_error'],
                }
              );
            } else if (error.status === 500 || error.status === 0) {
              this._snackBar.open('Error en el servidor', 'cerrar', {
                duration: 3000,
                panelClass: ['snackbar_error'],
              });
            }
            return throwError(
              () => new Error(error.message || 'Error desconocido')
            );
          })
        )
        .subscribe((res: any) => {
          this._snackBar
            .open('Tipo de membresía creado correctamente', 'cerrar', {
              duration: 1500,
              panelClass: ['snackbar_success'],
            })
            .afterDismissed()
            .subscribe((info) => {
              this.dialogRef.close('created');
            });
        });
    } else if (this.data.action == 'put') {
      this.http
        .put<any>(
          environment.membershipTypesUrl + '/' + this.data.membershipType.id,
          {
            name,
            description,
            price,
          }
        )
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 400) {
              this._snackBar.open(
                'Error al actualizar el tipo de membresía',
                'cerrar',
                {
                  duration: 3000,
                  panelClass: ['snackbar_error'],
                }
              );
            } else {
              this._snackBar.open(
                'Error al actualizar el tipo de membresía',
                'cerrar',
                {
                  duration: 3000,
                  panelClass: ['snackbar_error'],
                }
              );
            }
            return throwError(
              () => new Error(error.message || 'Error desconocido')
            );
          })
        )
        .subscribe((res: any) => {
          this._snackBar
            .open('Tipo de membresía actualizado correctamente', 'cerrar', {
              duration: 1500,
              panelClass: ['snackbar_success'],
            })
            .afterDismissed()
            .subscribe((info) => {
              this.dialogRef.close('updated');
            });
        });
    }
  }
}
