import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { environment } from '../../../../environments/environment.js';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IExerciseRoutine } from '../../../core/interfaces/exercise-routine.inteface.js';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../../core/services/snackbar.service.js';

@Component({
  selector: 'app-dialog-add-weight',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './dialog-add-weight.component.html',
  styleUrl: './dialog-add-weight.component.css',
})
export class DialogAddWeightComponent implements OnChanges {
  @Input() exerciseRoutine: IExerciseRoutine | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveWeight = new EventEmitter<number>();

  withoutWeight = false;
  selectedWeight: number | null = null;

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exerciseRoutine']) {
      if (this.exerciseRoutine?.weight) {
        if (this.exerciseRoutine.weight === 0) this.withoutWeight = true;
        else this.selectedWeight = this.exerciseRoutine.weight;
      }
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onSave(): void {
    if (
      this.withoutWeight === false &&
      (this.selectedWeight === null || this.selectedWeight <= 0)
    ) {
      return this.snackbarService.showError(
        'Ingrese un peso válido (debe ser mayor a cero) o marque la opción "Sin peso".'
      );
    }

    const weight = this.withoutWeight ? 0 : this.selectedWeight;

    this.http
      .patch(
        `${environment.routinesUrl}/exerciseroutines/${this.exerciseRoutine?.id}`,
        {
          weight,
        }
      )
      .subscribe({
        next: () => {
          this.snackbarService.showSuccess('Peso registrado exitosamente');
          this.saveWeight.emit(weight as number);
          this.onClose();
        },
        error: () => {
          this.snackbarService.showError('No se pudo registrar el peso');
        },
      });
  }
}
