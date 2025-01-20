import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-updated-dialog',
  standalone: true,
  imports: [MatDialogContent, MatButtonModule, MatDialogTitle],
  templateUrl: './password-updated-dialog.component.html',
  styleUrl: './password-updated-dialog.component.css',
})
export class PasswordUpdatedDialogComponent {
  readonly dialogRef = inject(MatDialogRef<PasswordUpdatedDialogComponent>);

  constructor(private router: Router) {}
  close(): void {
    this.router.navigate(['/']);
    this.dialogRef.close();
  }
}
