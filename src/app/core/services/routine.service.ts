import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { IExercise } from '../interfaces/exercise.interface';
import { IExerciseRoutine } from '../interfaces/exercise-routine.inteface';
import { IRoutine } from '../interfaces/routine.interface';

export interface IRoutineCreate {
  start: Date;
  end: Date;
  clientId: string;
  exerciseRoutine: IExerciseRoutine[];
}

@Injectable({
  providedIn: 'root',
})
export class IRutineService {
  private url = environment.routinesUrl;

  constructor(private http: HttpClient) {}
  getAll(): Observable<ApiResponse<IRoutine[]>> {
    return this.http.get<ApiResponse<IRoutine[]>>(this.url);
  }

  getById(id: string): Observable<ApiResponse<IRoutine>> {
    return this.http.get<ApiResponse<IRoutine>>(`${this.url}/${id}`);
  }

  create(routine: IRoutineCreate): Observable<ApiResponse<IRoutine>> {
    return this.http.post<ApiResponse<IRoutine>>(this.url, routine);
  }

  update(
    id: string,
    routine: IRoutineCreate
  ): Observable<ApiResponse<IRoutine>> {
    return this.http.put<ApiResponse<IRoutine>>(`${this.url}/${id}`, routine);
  }

  delete(id: string): Observable<ApiResponse<IRoutine>> {
    return this.http.delete<ApiResponse<IRoutine>>(`${this.url}/${id}`);
  }
}
