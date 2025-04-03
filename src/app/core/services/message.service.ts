import { ApiResponse } from '../interfaces/api-response.interface.js';
import { environment } from '../../../environments/environment.js';
import { HttpClient } from '@angular/common/http';
import IMessage from '../interfaces/IMessage.interface.js';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getMessagesFrom(
    receiver: string,
    sender: string
  ): Observable<ApiResponse<IMessage[]>> {
    return this.http.get<ApiResponse<IMessage[]>>(
      `${environment.apiUrl}/messages/${receiver}/${sender}`,
      {
        withCredentials: true,
      }
    );
  }

  getUnreadMessages(receiver: string): Observable<ApiResponse<IMessage[]>> {
    return this.http.post<ApiResponse<IMessage[]>>(
      `${environment.apiUrl}/messages/unread/${receiver}`,
      {
        withCredentials: true,
      }
    );
  }

  markMessagesAsRead(
    sender: string,
    receiver: string
  ): Observable<ApiResponse<IMessage[]>> {
    const url = `${environment.apiUrl}/messages/mark-as-read/${sender}/${receiver}`;
    return this.http.post<ApiResponse<IMessage[]>>(url, {});
  }
}
