import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../interfaces/crud-service.interface';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { IUserCreate } from './trainer.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService implements ICrudService<IUser, IUserCreate> {
  private url = environment.clientsUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IUser[]>> {
    return this.http.get<ApiResponse<IUser[]>>(this.url);
  }

  getById(id: string): Observable<ApiResponse<IUser>> {
    return this.http.get<ApiResponse<IUser>>(`${this.url}/${id}`);
  }

  create(client: IUserCreate): Observable<ApiResponse<IUser>> {
    return this.http.post<ApiResponse<IUser>>(this.url, client);
  }

  update(id: string, client: IUserCreate): Observable<ApiResponse<IUser>> {
    return this.http.put<ApiResponse<IUser>>(`${this.url}/${id}`, client);
  }

  delete(id: string): Observable<ApiResponse<IUser>> {
    return this.http.delete<ApiResponse<IUser>>(`${this.url}/${id}`);
  }
}
