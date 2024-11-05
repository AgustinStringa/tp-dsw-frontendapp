import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogClose,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';

interface DialogData {
  id: string;
  title: string;
  url: string;
}

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatFormFieldModule,
    MatDialogTitle,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css',
})
export class DeleteDialogComponent {
  url: string = '';
  title: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient
  ) {
    this.url = data.url + '/' + data.id;
    this.title = data.title;
  }

  onSubmit(): void {
    this.http.delete<any>(this.url).subscribe({
      next: () => {
        this.dialogRef.close('deleted');
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      },
    });
  }
}
