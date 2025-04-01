import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IClassType } from '../interfaces/class-type.interface';
import { ICrudService } from '../interfaces/crud-service.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IClassTypeCreate {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClassTypeService
  implements ICrudService<IClassType, IClassTypeCreate>
{
  private classTypesUrl = environment.classTypesUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IClassType[]>> {
    return this.http.get<ApiResponse<IClassType[]>>(this.classTypesUrl);
  }

  getById(id: string): Observable<ApiResponse<IClassType>> {
    return this.http.get<ApiResponse<IClassType>>(
      `${this.classTypesUrl}/${id}`
    );
  }

  create(classType: IClassTypeCreate): Observable<ApiResponse<IClassType>> {
    return this.http.post<ApiResponse<IClassType>>(
      this.classTypesUrl,
      classType
    );
  }

  update(
    id: string,
    classType: IClassTypeCreate
  ): Observable<ApiResponse<IClassType>> {
    return this.http.put<ApiResponse<IClassType>>(
      `${this.classTypesUrl}/${id}`,
      classType
    );
  }

  delete(id: string): Observable<ApiResponse<IClassType>> {
    return this.http.delete<ApiResponse<IClassType>>(
      `${this.classTypesUrl}/${id}`
    );
  }
}
