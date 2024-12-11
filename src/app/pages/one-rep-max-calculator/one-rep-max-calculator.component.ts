import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service.js';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-one-rep-max-calculator',
  standalone: true,
  imports: [FormsModule],
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
      if (this.reps === 1) {
        this.oneRepMax = this.weight;
      } else if (this.reps <= 10) {
        this.oneRepMax = this.weight / (1.0278 - 0.0278 * this.reps);
      } else {
        this.oneRepMax = this.weight * (1 + this.reps / 30);
      }
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
