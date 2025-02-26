import { Component } from '@angular/core';
import { IExerciseRoutine } from '../../../core/interfaces/exercise-routine.inteface.js';
import { environment } from '../../../../environments/environment.js';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import IRoutine from '../../../core/interfaces/IRoutine.interface.js';
import { DialogAddWeightComponent } from '../dialog-add-weight/dialog-add-weight.component.js';
import { AuthService } from '../../../services/auth.service.js';
import { SnackbarService } from '../../../services/snackbar.service.js';
import { differenceInWeeks } from 'date-fns';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-daily-routine',
  standalone: true,
  imports: [DialogAddWeightComponent, FormsModule],
  templateUrl: './daily-routine.component.html',
  styleUrl: './daily-routine.component.css',
})
export class DailyRoutineComponent {
  routine: IRoutine | null = null;
  exercisesRoutine: IExerciseRoutine[] = [];
  startDate: string = '';
  endDate: string = '';
  currentWeek: number = 0;
  currentDayName: string = '';
  currentDayNumber: number = 0;
  showModal: boolean = false;
  selectedExerciseRoutine: IExerciseRoutine | null = null;
  selectedWeight: number | null = null;
  userId: string = '';
  dayFilter: number = 1;
  filteredExerciseRoutine: IExerciseRoutine[] = [];
  availableDays: number[] = [];
  activeMembership: boolean = false;
  showUncompletedExercises: boolean = true;

  private daysOfWeek: string[] = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  months: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  currentDate = new Date();
  currentNameOfTheMonth = this.months[this.currentDate.getMonth()];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.id;
      this.getMembershipOfUser();
      this.loadRoutine();
    } else {
      console.error('No user found in session. Redirecting or handling error.');
    }
  }

  loadRoutine(): void {
    const today = new Date();
    this.currentDayName = this.getDayName(today.getDay());
    this.currentDayNumber = today.getDate();

    this.http
      .get<{ message: string; data: IRoutine }>(
        `${environment.routinesUrl}/${this.userId}/current`
      )
      .subscribe({
        next: (res) => {
          this.routine = res.data;
          if (this.routine) {
            this.startDate =
              formatDate(this.routine.start, 'yyyy-MM-dd', 'en-US') || '';
            this.endDate =
              formatDate(this.routine.end, 'yyyy-MM-dd', 'en-US') || '';
            this.exercisesRoutine = this.routine.exercisesRoutine.map(
              (exerciseRoutine) => ({
                id: exerciseRoutine.id,
                exercise: exerciseRoutine.exercise,
                series: exerciseRoutine.series || 0,
                repetitions: exerciseRoutine.repetitions || 0,
                day: exerciseRoutine.day,
                week: exerciseRoutine.week,
                weight: exerciseRoutine.weight,
              })
            );

            this.currentWeek = this.getCurrentWeek(
              new Date(this.routine.start)
            );
            this.availableDays = this.getAvailableDays(this.exercisesRoutine);
            this.applyFilter(this.dayFilter);
          }
        },
        error: () => {},
      });
  }

  applyFilter(day: number): void {
    this.dayFilter = day;
    const filterUncompleted = this.showUncompletedExercises;

    this.filteredExerciseRoutine = this.exercisesRoutine.filter(
      (exerciseRoutine) => {
        const matchesDay =
          day === 0 || Number(exerciseRoutine.day) === Number(day);
        const matchesCompletion =
          !filterUncompleted || exerciseRoutine.weight === null;
        return matchesDay && matchesCompletion;
      }
    );
  }

  getMembershipOfUser() {
    this.http
      .get<{ message: string; data: any }>(
        `${environment.membershipsActive}/${this.userId}`
      )
      .subscribe({
        next: (res) => {
          if (res.data) {
            this.activeMembership = true;
            return res.data;
          }
        },
        error: () => {},
      });
  }

  private getDayName(dayIndex: number): string {
    return this.daysOfWeek[dayIndex] || '';
  }

  getCurrentWeek(startDate: Date): number {
    return differenceInWeeks(new Date(), startDate) + 1;
  }

  openModal(exerciseRoutine: IExerciseRoutine): void {
    this.selectedExerciseRoutine = exerciseRoutine;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  saveWeight(weight: number): void {
    if (this.selectedExerciseRoutine) {
      this.selectedExerciseRoutine.weight = weight;
      this.closeModal();
    }
  }

  getExerciseStatus(exerciseRoutine: IExerciseRoutine): string {
    if (exerciseRoutine.weight === 0) return 'Realizado';
    if (exerciseRoutine.weight === null) return 'No realizado';
    return `Realizado con ${exerciseRoutine.weight} Kg`;
  }

  getAvailableDays(exercises: IExerciseRoutine[]): number[] {
    const daysSet = new Set<number>();
    exercises.forEach((exercise) => daysSet.add(Number(exercise.day)));
    return Array.from(daysSet).sort((a, b) => a - b);
  }
}
