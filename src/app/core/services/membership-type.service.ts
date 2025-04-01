import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMembershipType } from '../interfaces/membership-type.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IMembershipTypeCreate {
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class MembershipTypeService {
  private membershipTypesUrl = environment.membershipTypesUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IMembershipType[]>> {
    return this.http.get<ApiResponse<IMembershipType[]>>(
      this.membershipTypesUrl
    );
  }

  getById(id: string): Observable<ApiResponse<IMembershipType>> {
    return this.http.get<ApiResponse<IMembershipType>>(
      `${this.membershipTypesUrl}/${id}`
    );
  }

  create(
    membershipType: IMembershipTypeCreate
  ): Observable<ApiResponse<IMembershipType>> {
    return this.http.post<ApiResponse<IMembershipType>>(
      this.membershipTypesUrl,
      membershipType
    );
  }

  update(
    id: string,
    membershipType: IMembershipTypeCreate
  ): Observable<ApiResponse<IMembershipType>> {
    return this.http.put<ApiResponse<IMembershipType>>(
      `${this.membershipTypesUrl}/${id}`,
      membershipType
    );
  }

  delete(id: string): Observable<ApiResponse<IMembershipType>> {
    return this.http.delete<ApiResponse<IMembershipType>>(
      `${this.membershipTypesUrl}/${id}`
    );
  }
}
