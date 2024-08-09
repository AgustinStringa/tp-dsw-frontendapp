import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [HttpClientModule],
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
    let url = '//localhost:3000/api';
    if (this.entity === 'client') {
      url += '/clients';
    } else if (this.entity === 'trainers') {
      url += '/trainers';
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
