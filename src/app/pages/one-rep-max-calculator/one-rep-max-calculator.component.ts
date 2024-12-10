import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../services/snackbar.service.js';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-one-rep-max-calculator',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './one-rep-max-calculator.component.html',
  styleUrl: './one-rep-max-calculator.component.css',
})
export class OneRepMaxCalculatorComponent {
  weight: number = 0;
  reps: number = 1;
  oneRepMax: number | null = null;

  constructor(
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<OneRepMaxCalculatorComponent>
  ) {}

  calculateOneRepMax(): number | null {
    if (this.weight > 0 && this.reps > 0) {
      this.oneRepMax = this.weight * (1 + this.reps / 30);
      this.snackbarService.showSuccess(
        `🎉 ¡Tu repetición máxima estimada es de ${this.oneRepMax.toFixed(
          2
        )} kg!`
      );
    } else {
      this.snackbarService.showError('Por favor, ingrese datos válidos.');
    }
    return this.oneRepMax;
  }

  closeModal() {
    this.dialogRef.close();
  }
}
