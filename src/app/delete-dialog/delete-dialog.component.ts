import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../environments/environment.js';
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
  title: string = '';
  id: string = '';
  entity: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.title = data.title;
    this.id = data.id;
    this.entity = data.entity;
  }

  onSubmit(): void {
    let url = '';
    if (this.entity === 'client') {
      url += environment.deleteClientUrl;
    } else if (this.entity === 'trainers') {
      url += environment.deleteTrainerUrl;
    } else if (this.entity === 'exercises') {
      url += environment.deleteExerciseUrl;
    }
    url += '/' + this.id;

    try {
      this.http.delete<any>(url).subscribe();
      this.dialogRef.close();
    } catch (error: any) {
      console.log(error);
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
