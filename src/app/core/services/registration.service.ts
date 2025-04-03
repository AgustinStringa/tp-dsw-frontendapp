import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegistration } from '../interfaces/registration.interface';
import { Observable } from 'rxjs';

export interface IRegistrationCreate {
  clientId: string;
  classId: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private url = environment.registrationUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IRegistration[]>> {
    return this.http.get<ApiResponse<IRegistration[]>>(this.url);
  }

  getById(id: string): Observable<ApiResponse<IRegistration>> {
    return this.http.get<ApiResponse<IRegistration>>(`${this.url}/${id}`);
  }

  getByClient(clientId: string): Observable<ApiResponse<IRegistration[]>> {
    return this.http.get<ApiResponse<IRegistration[]>>(
      `${this.url}/client/${clientId}`
    );
  }

  create(
    registration: IRegistrationCreate
  ): Observable<ApiResponse<IRegistration>> {
    return this.http.post<ApiResponse<IRegistration>>(this.url, registration);
  }

  cancel(id: string): Observable<ApiResponse<IRegistration>> {
    return this.http.patch<ApiResponse<IRegistration>>(
      `${this.url}/cancel/${id}`,
      {}
    );
  }
}
