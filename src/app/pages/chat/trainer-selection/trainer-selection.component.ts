import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../../environments/environment.js';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../core/interfaces/user.interface.js';

@Component({
  selector: 'app-trainer-selection',
  standalone: true,
  imports: [],
  templateUrl: './trainer-selection.component.html',
  styleUrl: './trainer-selection.component.css',
})
export class TrainerSelectionComponent {
  @Output() trainerSelected = new EventEmitter<IUser>();
  trainers: IUser[] = [];
  selectedTrainer: IUser | null = null;

  constructor(private http: HttpClient) {
    this.getTrainers();
  }

  getTrainers() {
    this.http.get<any>(environment.trainersUrl).subscribe({
      next: (res) => {
        this.trainers = res.data;
      },
      error: () => {
        console.error('Error al obtener los entrenadores');
      },
    });
  }

  selectTrainer(trainer: IUser) {
    this.selectedTrainer = trainer;
    this.trainerSelected.emit(this.selectedTrainer);
  }
}
