import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IExerciseRoutine } from '../../../core/interfaces/exercise-routine.inteface';

@Component({
  selector: 'app-exercise-routine-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './exercise-routine-card.component.html',
  styleUrl: './exercise-routine-card.component.css',
})
export class ExerciseRoutineCardComponent {
  @Input() exerciseRoutine: IExerciseRoutine | null = null;
}
