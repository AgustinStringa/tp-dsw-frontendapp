import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IMessage } from '../interfaces/message.interface';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface.js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getRecipients(): Observable<ApiResponse<IUser[]>> {
    return this.http.get<ApiResponse<IUser[]>>(
      `${environment.messagesUrl}/recipients`,
      {
        withCredentials: true,
      }
    );
  }

  getMessagesFrom(userId: string): Observable<ApiResponse<IMessage[]>> {
    return this.http.get<ApiResponse<IMessage[]>>(
      `${environment.messagesUrl}/user/${userId}`,
      {
        withCredentials: true,
      }
    );
  }

  getUnreadMessages(): Observable<ApiResponse<IMessage[]>> {
    return this.http.post<ApiResponse<IMessage[]>>(
      `${environment.messagesUrl}/user/unread`,
      {
        withCredentials: true,
      }
    );
  }

  markMessagesAsRead(userId: string): Observable<ApiResponse<IMessage[]>> {
    const url = `${environment.messagesUrl}/user/${userId}/mark-as-read`;
    return this.http.patch<ApiResponse<IMessage[]>>(url, {});
  }
}
