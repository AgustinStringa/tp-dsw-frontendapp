import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPayment } from '../interfaces/payment.interface';
import { Observable } from 'rxjs';
import { PaymentMethodEnum } from '../enums/payment-method.enum';

export interface IPaymentCreate {
  amount: number;
  membershipId: string;
  paymentMethod: PaymentMethodEnum;
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

  getByMembership(membershipId: string): Observable<ApiResponse<IPayment[]>> {
    return this.http.get<ApiResponse<IPayment[]>>(
      `${environment.membershipsUrl}/${membershipId}/payments`
    );
  }

  getById(id: string): Observable<ApiResponse<IPayment>> {
    return this.http.get<ApiResponse<IPayment>>(`${this.url}/${id}`);
  }

  create(payment: IPaymentCreate): Observable<ApiResponse<IPayment>> {
    return this.http.post<ApiResponse<IPayment>>(this.url, payment);
  }

  update(
    id: string,
    payment: IPaymentCreate
  ): Observable<ApiResponse<IPayment>> {
    return this.http.put<ApiResponse<IPayment>>(`${this.url}/${id}`, payment);
  }

  delete(id: string): Observable<ApiResponse<IPayment>> {
    return this.http.delete<ApiResponse<IPayment>>(`${this.url}/${id}`);
  }
}
