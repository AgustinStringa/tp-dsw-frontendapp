import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../interfaces/crud-service.interface';
import { Injectable } from '@angular/core';
import { IProgress } from '../interfaces/progress.interface.js';
import { Observable } from 'rxjs';

export interface IProgressCreate {
  date: Date;
  weight: number;
  fatPercentage: number;
  bodyMeasurements: string;
  clientId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProgressService
  implements ICrudService<IProgress, IProgressCreate>
{
  private url = environment.progressesUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IProgress[]>> {
    return this.http.get<ApiResponse<IProgress[]>>(this.url);
  }

  getById(id: string): Observable<ApiResponse<IProgress>> {
    return this.http.get<ApiResponse<IProgress>>(`${this.url}/${id}`);
  }

  getByClientId(clientId: string): Observable<ApiResponse<IProgress[]>> {
    return this.http.get<ApiResponse<IProgress[]>>(
      `${environment.clientsUrl}/${clientId}/progresses`
    );
  }

  create(progress: IProgressCreate): Observable<ApiResponse<IProgress>> {
    return this.http.post<ApiResponse<IProgress>>(this.url, progress);
  }

  update(
    id: string,
    progress: IProgressCreate
  ): Observable<ApiResponse<IProgress>> {
    return this.http.put<ApiResponse<IProgress>>(`${this.url}/${id}`, progress);
  }

  delete(id: string): Observable<ApiResponse<IProgress>> {
    return this.http.delete<ApiResponse<IProgress>>(`${this.url}/${id}`);
  }
}
