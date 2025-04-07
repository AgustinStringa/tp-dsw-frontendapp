import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../interfaces/crud-service.interface';
import { IMembership } from '../interfaces/membership.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IMembershipCreate {
  typeId: string;
  clientId: string;
}

@Injectable({
  providedIn: 'root',
})
export class MembershipService
  implements ICrudService<IMembership, IMembershipCreate>
{
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
      `${environment.activeMembershipsUrl}/clients/${clientId}`
    );
  }

  create(membership: IMembershipCreate): Observable<ApiResponse<IMembership>> {
    return this.http.post<ApiResponse<IMembership>>(
      this.membershipsUrl,
      membership
    );
  }

  update(
    id: string,
    membership: IMembershipCreate
  ): Observable<ApiResponse<IMembership>> {
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
