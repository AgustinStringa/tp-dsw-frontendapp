import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../interfaces/crud-service.interface';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

export interface IUserCreate {
  lastName: string;
  firstName: string;
  dni: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TrainerService implements ICrudService<IUser, IUserCreate> {
  private url = environment.trainersUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IUser[]>> {
    return this.http.get<ApiResponse<IUser[]>>(this.url);
  }

  getById(id: string): Observable<ApiResponse<IUser>> {
    return this.http.get<ApiResponse<IUser>>(`${this.url}/${id}`);
  }

  create(trainer: IUserCreate): Observable<ApiResponse<IUser>> {
    return this.http.post<ApiResponse<IUser>>(this.url, trainer);
  }

  update(id: string, trainer: IUserCreate): Observable<ApiResponse<IUser>> {
    return this.http.put<ApiResponse<IUser>>(`${this.url}/${id}`, trainer);
  }

  delete(id: string): Observable<ApiResponse<IUser>> {
    return this.http.delete<ApiResponse<IUser>>(`${this.url}/${id}`);
  }
}
