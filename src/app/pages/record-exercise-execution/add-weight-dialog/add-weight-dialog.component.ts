import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ExerciseRoutineService,
  IExerciseRoutineUpdate,
} from '../../../core/services/exercise-routine.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { IExerciseRoutine } from '../../../core/interfaces/exercise-routine.inteface';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-dialog-add-weight',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-weight-dialog.component.html',
  styleUrl: './add-weight-dialog.component.css',
})
export class AddWeightDialogComponent implements OnChanges {
  @Input({ required: true }) exerciseRoutine!: IExerciseRoutine;

  @Output() closeModal = new EventEmitter<void>();
  @Output() saveWeight = new EventEmitter<number>();

  form = new FormGroup({
    weight: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0.01),
    ]),
    withoutWeight: new FormControl<boolean>(false, [Validators.required]),
  });

  constructor(
    private exerciseRoutineService: ExerciseRoutineService,
    private snackbarService: SnackbarService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['exerciseRoutine']) {
      if (this.exerciseRoutine.weight) {
        if (this.exerciseRoutine.weight === 0) {
          this.form.controls.withoutWeight.setValue(true);
          this.form.controls.weight.removeValidators(Validators.required);
        } else {
          this.form.controls.weight.setValue(this.exerciseRoutine.weight);
        }
      }
    }
  }

  selectWithoutWeight() {
    if (!this.form.value.withoutWeight) {
      this.form.controls.weight.removeValidators(Validators.required);
      this.form.controls.weight.setValue(null);
      this.form.controls.weight.disable();
    } else {
      this.form.controls.weight.enable();
      this.form.controls.weight.addValidators(Validators.required);
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onSave(): void {
    if (
      this.form.value.withoutWeight === false &&
      (this.form.value.weight === null ||
        (this.form.value.weight && this.form.value.weight <= 0))
    ) {
      return this.snackbarService.showError(
        'Ingrese un peso válido (debe ser mayor a cero) o marque la opción "Sin peso".'
      );
    }

    const data: IExerciseRoutineUpdate = {
      weight: this.form.value.withoutWeight ? 0 : this.form.value.weight!,
    };

    this.exerciseRoutineService
      .markAsDone(this.exerciseRoutine.id!, data)
      .subscribe({
        next: () => {
          this.snackbarService.showSuccess('Peso registrado exitosamente.');
          this.saveWeight.emit(data.weight as number);
          this.onClose();
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.isUserFriendly)
            this.snackbarService.showError(err.error.message);
          else this.snackbarService.showError('Error al registrar el peso.');
        },
      });
  }
}
