import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMembership } from '../interfaces/membership.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IClientHomeInformation {
  goalsCount: number;
  progressesCount: number;
  registrationsCount: number;
  currentMembership: IMembership | null;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getInformationForClient(): Observable<ApiResponse<IClientHomeInformation>> {
    const url = `${environment.clientsUrl}/home`;
    return this.http.get<ApiResponse<IClientHomeInformation>>(`${url}`);
  }
}
