import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import IExerciseRoutine from '../../../core/interfaces/IExerciseRoutine.inteface.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.js';

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

  constructor(private http: HttpClient) {}

  onClose(): void {
    this.closeModal.emit();
  }

  onSave(): void {
    if (this.selectedWeight !== null && this.exerciseRoutine) {
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
              console.log('Weight updated successfully:', response);
              this.saveWeight.emit(this.selectedWeight as number);
              this.onClose();
            },
            (error) => {
              console.error('Error updating weight:', error);
              alert(
                'Failed to update weight. Please check the console for details.'
              );
            }
          );
      } else {
        console.error('Exercise ID is missing');
        alert('Exercise ID is missing.');
      }
    } else {
      console.error('Selected weight or exercise routine is missing');
      alert('Selected weight or exercise routine is missing.');
    }
  }
}
