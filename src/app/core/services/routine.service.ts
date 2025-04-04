import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../interfaces/crud-service.interface';
import { IExerciseRoutineCreate } from './exercise-routine.service';
import { Injectable } from '@angular/core';
import { IRoutine } from '../interfaces/routine.interface';
import { Observable } from 'rxjs';

export interface IRoutineCreate {
  start: Date;
  end: Date;
  clientId: string;
  exercisesRoutine: IExerciseRoutineCreate[];
}

@Injectable({
  providedIn: 'root',
})
export class RoutineService implements ICrudService<IRoutine, IRoutineCreate> {
  private url = environment.routinesUrl;

  constructor(private http: HttpClient) {}
  getAll(): Observable<ApiResponse<IRoutine[]>> {
    return this.http.get<ApiResponse<IRoutine[]>>(this.url);
  }

  getById(id: string): Observable<ApiResponse<IRoutine>> {
    return this.http.get<ApiResponse<IRoutine>>(`${this.url}/${id}`);
  }

  getCurrentByClient(clientId: string): Observable<ApiResponse<IRoutine>> {
    return this.http.get<ApiResponse<IRoutine>>(
      `${this.url}/clients/${clientId}/current`
    );
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
