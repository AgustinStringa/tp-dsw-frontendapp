import { Component, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  httpClient: HttpClient;
}

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    HttpClientModule,
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
  private http: HttpClient;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.http = data.httpClient;
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
