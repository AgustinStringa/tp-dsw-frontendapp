import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../interfaces/crud-service.interface';
import { IGoal } from '../interfaces/goal.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IGoalCreate {
  done: boolean;
  fatPercentage: number;
  bodyMeasurements: string;
  clientId: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoalService implements ICrudService<IGoal, IGoalCreate> {
  private url = environment.goalsUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IGoal[]>> {
    return this.http.get<ApiResponse<IGoal[]>>(this.url);
  }

  getById(id: string): Observable<ApiResponse<IGoal>> {
    return this.http.get<ApiResponse<IGoal>>(`${this.url}/${id}`);
  }

  getByClientId(clientId: string): Observable<ApiResponse<IGoal[]>> {
    return this.http.get<ApiResponse<IGoal[]>>(
      `${environment.clientsUrl}/${clientId}/goals`
    );
  }

  create(goal: IGoalCreate): Observable<ApiResponse<IGoal>> {
    return this.http.post<ApiResponse<IGoal>>(this.url, goal);
  }

  update(id: string, goal: IGoalCreate): Observable<ApiResponse<IGoal>> {
    return this.http.put<ApiResponse<IGoal>>(`${this.url}/${id}`, goal);
  }

  delete(id: string): Observable<ApiResponse<IGoal>> {
    return this.http.delete<ApiResponse<IGoal>>(`${this.url}/${id}`);
  }
}
