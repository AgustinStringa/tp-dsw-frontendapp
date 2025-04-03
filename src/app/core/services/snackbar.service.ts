import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  showSuccess(message: string): MatSnackBarRef<TextOnlySnackBar> {
    return this._snackBar.open(message, 'cerrar', {
      duration: 3000,
      panelClass: ['snackbar_success'],
    });
  }

  showError(message: string): void {
    this._snackBar.open(message, 'cerrar', {
      duration: 3000,
      panelClass: ['snackbar_error'],
    });
  }
}
