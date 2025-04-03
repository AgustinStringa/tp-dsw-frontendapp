import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../interfaces/crud-service.interface';
import { IExercise } from '../interfaces/exercise.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IExerciseCreate {
  name: string;
  description: string;
  urlVideo: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService
  implements ICrudService<IExercise, IExerciseCreate>
{
  private url = environment.exercisesUrl;

  constructor(private http: HttpClient) {}
  getAll(): Observable<ApiResponse<IExercise[]>> {
    return this.http.get<ApiResponse<IExercise[]>>(this.url);
  }

  getById(id: string): Observable<ApiResponse<IExercise>> {
    return this.http.get<ApiResponse<IExercise>>(`${this.url}/${id}`);
  }

  create(exercise: IExerciseCreate): Observable<ApiResponse<IExercise>> {
    return this.http.post<ApiResponse<IExercise>>(this.url, exercise);
  }

  update(
    id: string,
    exercise: IExerciseCreate
  ): Observable<ApiResponse<IExercise>> {
    return this.http.put<ApiResponse<IExercise>>(`${this.url}/${id}`, exercise);
  }

  delete(id: string): Observable<ApiResponse<IExercise>> {
    return this.http.delete<ApiResponse<IExercise>>(`${this.url}/${id}`);
  }
}
