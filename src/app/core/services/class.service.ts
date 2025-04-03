import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IClass } from '../interfaces/class.interface';
import { ICrudService } from '../interfaces/crud-service.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IClassCreate {
  day: number;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  location: string;
  active: boolean;
  classTypeId: string;
  trainerId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClassService implements ICrudService<IClass, IClassCreate> {
  private classesUrl = environment.classesUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IClass[]>> {
    return this.http.get<ApiResponse<IClass[]>>(this.classesUrl);
  }

  getById(id: string): Observable<ApiResponse<IClass>> {
    return this.http.get<ApiResponse<IClass>>(`${this.classesUrl}/${id}`);
  }

  getActive(): Observable<ApiResponse<IClass[]>> {
    return this.http.get<ApiResponse<IClass[]>>(`${this.classesUrl}/active`);
  }

  create(classToAdd: IClassCreate): Observable<ApiResponse<IClass>> {
    return this.http.post<ApiResponse<IClass>>(this.classesUrl, classToAdd);
  }

  update(
    id: string,
    classToUpdate: IClassCreate
  ): Observable<ApiResponse<IClass>> {
    return this.http.put<ApiResponse<IClass>>(
      `${this.classesUrl}/${id}`,
      classToUpdate
    );
  }

  delete(id: string): Observable<ApiResponse<IClass>> {
    return this.http.delete<ApiResponse<IClass>>(`${this.classesUrl}/${id}`);
  }
}
