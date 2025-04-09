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

export interface ITrainerHomeInformation {
  incomeLast30Days: number;
  stripeIncomeLast30Days: number;
  activeClassesCount: number;
  activeMembershipsCount: number;
  clientClassRegistrationsCount: number;
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

  getInformationForTrainer(): Observable<ApiResponse<ITrainerHomeInformation>> {
    const url = `${environment.trainersUrl}/home`;
    return this.http.get<ApiResponse<ITrainerHomeInformation>>(`${url}`);
  }
}
