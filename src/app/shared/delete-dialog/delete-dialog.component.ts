import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ICrudService } from '../../core/interfaces/crud-service.interface';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarService } from '../../core/services/snackbar.service';

interface DialogData {
  id: string;
  title: string;
  service: ICrudService<unknown, unknown>;
}

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css',
})
export class DeleteDialogComponent {
  id: string;
  title: string;
  service: ICrudService<unknown, unknown>;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackbarService: SnackbarService
  ) {
    if (!data || !data.id || !data.title || !data.service) {
      this.snackbarService.showError('Faltan datos requeridos para el dialog.');
      throw new Error('Faltan datos requeridos para el dialog.');
    }

    this.id = data.id;
    this.title = data.title;
    this.service = data.service;
  }

  onSubmit(): void {
    this.service.delete(this.id).subscribe({
      next: () => {
        this.dialogRef.close('deleted');
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else this.snackbarService.showError('Error al eliminar la entidad.');
      },
    });
  }
}
