import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import IExerciseRoutine from '../../../core/interfaces/IExerciseRoutine.inteface.js';

@Component({
  selector: 'app-dialog-add-weight',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dialog-add-weight.component.html',
  styleUrl: './dialog-add-weight.component.css',
})
export class DialogAddWeightComponent {
  @Input() exerciseRoutine: IExerciseRoutine | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveWeight = new EventEmitter<number>();

  selectedWeight: number | null = null;

  onClose(): void {
    this.closeModal.emit(); // Emitir evento para cerrar el modal
  }

  onSave(): void {
    if (this.selectedWeight !== null && this.exerciseRoutine) {
      this.saveWeight.emit(this.selectedWeight); // Emitir evento para guardar el peso
      this.onClose(); // Cerrar el modal después de guardar
    }
  }
}
