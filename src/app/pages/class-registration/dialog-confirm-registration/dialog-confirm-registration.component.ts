import { DialogModule } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-confirm-registration',
  standalone: true,
  imports: [DialogModule, MatDialogActions, MatDialogContent],
  templateUrl: './dialog-confirm-registration.component.html',
  styleUrl: './dialog-confirm-registration.component.css',
})
export class DialogConfirmRegistrationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
