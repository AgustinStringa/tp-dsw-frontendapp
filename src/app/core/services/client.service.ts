import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

export interface ClientCreate {
  lastName: string;
  firstName: string;
  dni: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private url = environment.clientsUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IUser[]>> {
    return this.http.get<ApiResponse<IUser[]>>(this.url);
  }

  getById(id: string): Observable<ApiResponse<IUser>> {
    return this.http.get<ApiResponse<IUser>>(`${this.url}/${id}`);
  }

  create(client: ClientCreate): Observable<ApiResponse<IUser>> {
    return this.http.post<ApiResponse<IUser>>(this.url, client);
  }

  update(id: string, client: ClientCreate): Observable<ApiResponse<IUser>> {
    return this.http.put<ApiResponse<IUser>>(`${this.url}/${id}`, client);
  }

  delete(id: string): Observable<ApiResponse<IUser>> {
    return this.http.delete<ApiResponse<IUser>>(`${this.url}/${id}`);
  }
}
