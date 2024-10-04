import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IExerciseRoutine } from '../../../core/interfaces/exercise-routine.inteface.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-add-weight',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './dialog-add-weight.component.html',
  styleUrl: './dialog-add-weight.component.css',
})
export class DialogAddWeightComponent {
  @Input() exerciseRoutine: IExerciseRoutine | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveWeight = new EventEmitter<number>();

  private _snackBar = inject(MatSnackBar);

  selectedWeight: number | null = null;

  constructor(private http: HttpClient) {}

  onClose(): void {
    this.closeModal.emit();
  }

  onSave(): void {
    if (
      this.selectedWeight !== null &&
      this.selectedWeight >= 0 &&
      this.exerciseRoutine
    ) {
      if (this.exerciseRoutine.id) {
        this.http
          .patch(
            `${environment.routinesUrl}/exerciseroutines/${this.exerciseRoutine.id}`,
            {
              weight: this.selectedWeight,
            }
          )
          .subscribe(
            (response) => {
              this.openSnackBar('Peso actualizado exitosamente.', 'Cerrar');
              this.saveWeight.emit(this.selectedWeight as number);
              this.onClose();
            },
            (error) => {
              console.error('No se pudo actualizar el peso.', error);
              this.openSnackBar('No se pudo actualizar el peso.', 'Cerrar');
            }
          );
      } else {
        console.error('Falta el ID del ejercicio');
      }
    } else {
      console.error(
        'El peso seleccionado no es válido o falta la rutina de ejercicios'
      );
      this.openSnackBar(
        'Ingrese un peso válido (no debe ser negativo) y asegúrese de que la rutina de ejercicios esté seleccionada.',
        'Cerrar'
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
