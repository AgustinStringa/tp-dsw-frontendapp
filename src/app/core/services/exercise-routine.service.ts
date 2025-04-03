import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IExerciseRoutine } from '../interfaces/exercise-routine.inteface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IExerciseRoutineCreate {
  week: number;
  day: number;
  series: number;
  repetitions: number;
  exercise: string;
}

export interface IExerciseRoutineUpdate {
  weight: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseRoutineService {
  private url = environment.exerciseRoutinesUrl;

  constructor(private http: HttpClient) {}

  markAsDone(
    id: string,
    data: IExerciseRoutineUpdate
  ): Observable<ApiResponse<IExerciseRoutine>> {
    return this.http.patch<ApiResponse<IExerciseRoutine>>(
      `${this.url}/${id}/record-execution`,
      { data }
    );
  }
}
