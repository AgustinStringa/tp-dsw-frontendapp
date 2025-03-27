import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface DialogData {
  trainer: string;
  day: string;
  startTime: string;
}

@Component({
  selector: 'app-dialog-confirm-registration',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
  ],
  templateUrl: './dialog-confirm-registration.component.html',
  styleUrl: './dialog-confirm-registration.component.css',
})
export class DialogConfirmRegistrationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
