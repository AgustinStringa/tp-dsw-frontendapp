import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { IExerciseRoutine } from '../interfaces/exercise-routine.inteface';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private url = environment.exerciseRoutinesUrl;

  constructor(private http: HttpClient) {}
  markAsDone(id: string): Observable<ApiResponse<IExerciseRoutine>> {
    return this.http.patch<ApiResponse<IExerciseRoutine>>(
      `${this.url}/${id}/record-execution`,
      {}
    );
  }
}
