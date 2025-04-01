import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';
import { IExercise } from '../interfaces/exercise.interface';

export interface IExerciseCreate {
  name: string;
  description: string;
  urlVideo: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
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
