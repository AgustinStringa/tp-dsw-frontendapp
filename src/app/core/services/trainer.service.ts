import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrainer } from '../interfaces/trainer.interface';

export interface ITrainerCreate {
  lastName: string;
  firstName: string;
  dni: number;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private url = environment.trainersUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<ITrainer[]>> {
    return this.http.get<ApiResponse<ITrainer[]>>(this.url);
  }

  getById(id: string): Observable<ApiResponse<ITrainer>> {
    return this.http.get<ApiResponse<ITrainer>>(`${this.url}/${id}`);
  }

  create(trainer: ITrainerCreate): Observable<ApiResponse<ITrainer>> {
    return this.http.post<ApiResponse<ITrainer>>(this.url, trainer);
  }

  update(
    id: string,
    trainer: ITrainerCreate
  ): Observable<ApiResponse<ITrainer>> {
    return this.http.put<ApiResponse<ITrainer>>(`${this.url}/${id}`, trainer);
  }

  delete(id: string): Observable<ApiResponse<ITrainer>> {
    return this.http.delete<ApiResponse<ITrainer>>(`${this.url}/${id}`);
  }
}
