import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMembership } from '../interfaces/membership.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//TODO tipar errores?
export interface ApiResponse<T> {
  //TODO moverla
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class MembershipService {
  private membershipsUrl = environment.membershipsUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IMembership[]>> {
    return this.http.get<ApiResponse<IMembership[]>>(this.membershipsUrl);
  }

  getById(id: string): Observable<ApiResponse<IMembership>> {
    return this.http.get<ApiResponse<IMembership>>(
      `${this.membershipsUrl}/${id}`
    );
  }

  getActive(): Observable<ApiResponse<IMembership[]>> {
    return this.http.get<ApiResponse<IMembership[]>>(
      environment.activeMembershipsUrl
    );
  }

  getOutstanding(): Observable<ApiResponse<IMembership[]>> {
    return this.http.get<ApiResponse<IMembership[]>>(
      environment.outstandingMembershipsUrl
    );
  }

  getActiveByClient(clientId: string): Observable<ApiResponse<IMembership>> {
    return this.http.get<ApiResponse<IMembership>>(
      `${environment.activeMembershipsUrl}/${clientId}`
    );
  }

  create(membership: {}): Observable<ApiResponse<IMembership>> {
    return this.http.post<ApiResponse<IMembership>>(
      this.membershipsUrl,
      membership
    );
  }

  update(id: string, membership: {}): Observable<ApiResponse<IMembership>> {
    return this.http.put<ApiResponse<IMembership>>(
      `${this.membershipsUrl}/${id}`,
      membership
    );
  }

  delete(id: string): Observable<ApiResponse<IMembership>> {
    return this.http.delete<ApiResponse<IMembership>>(
      `${this.membershipsUrl}/${id}`
    );
  }
}
