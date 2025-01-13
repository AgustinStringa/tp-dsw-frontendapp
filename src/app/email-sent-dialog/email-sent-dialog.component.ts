import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

export interface EmailSentDialogData {
  email: string;
}

@Component({
  selector: 'app-email-sent-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
  ],
  templateUrl: './email-sent-dialog.component.html',
  styleUrl: './email-sent-dialog.component.css',
})
export class EmailSentDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EmailSentDialogComponent>);
  readonly data = inject<EmailSentDialogData>(MAT_DIALOG_DATA);

  closeDialog(): void {
    this.dialogRef.close();
  }
}
