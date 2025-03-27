import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPayment } from '../interfaces/payment.interface';
import { Observable } from 'rxjs';

export interface ApiResponse<T> {
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private url = environment.paymentsUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IPayment[]>> {
    return this.http.get<ApiResponse<IPayment[]>>(this.url);
  }

  getById(id: string): Observable<ApiResponse<IPayment>> {
    return this.http.get<ApiResponse<IPayment>>(`${this.url}/${id}`);
  }
  //TODO tipar errores?

  create(payment: {
    amount: number;
    membershipId: string;
    paymentMethod: string;
  }): Observable<ApiResponse<IPayment>> {
    return this.http.post<ApiResponse<IPayment>>(this.url, payment);
  }

  update(
    id: string,
    payment: {
      amount: number;
      membershipId: string;
      paymentMethod: string;
    }
  ): Observable<ApiResponse<IPayment>> {
    return this.http.put<ApiResponse<IPayment>>(`${this.url}/${id}`, payment);
  }

  delete(id: string): Observable<ApiResponse<IPayment>> {
    return this.http.delete<ApiResponse<IPayment>>(`${this.url}/${id}`);
  }
}
