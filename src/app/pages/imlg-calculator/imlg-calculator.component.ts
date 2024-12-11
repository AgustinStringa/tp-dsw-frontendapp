import { Component } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service.js';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-imlg-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './imlg-calculator.component.html',
  styleUrl: './imlg-calculator.component.css',
})
export class ImlgCalculatorComponent {
  weight: number | null = null;
  height: number | null = null;

  constructor(
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<ImlgCalculatorComponent>
  ) {}

  calculateIMC(): void {
    if (this.weight && this.height && this.weight > 0 && this.height > 0) {
      const imc = this.weight / (this.height * this.height);
      let category = '';

      if (imc < 18.5) {
        category = 'Bajo peso';
      } else if (imc >= 18.5 && imc < 24.9) {
        category = 'Peso normal';
      } else if (imc >= 25 && imc < 29.9) {
        category = 'Sobrepeso';
      } else {
        category = 'Obesidad';
      }

      this.snackbarService.showSuccess(
        `🎉 Tu IMC es ${imc.toFixed(2)}. Categoría: ${category}.`
      );
    } else {
      this.snackbarService.showError(
        '❌ Por favor, ingresa valores válidos para peso y altura.'
      );
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
