import { ApiResponse } from '../interfaces/api-response.interface.js';
import { environment } from '../../../environments/environment.js';
import { HttpClient } from '@angular/common/http';
import IMessage from '../interfaces/IMessage.interface.js';
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

  getMessagesFrom(user: string): Observable<ApiResponse<IMessage[]>> {
    return this.http.get<ApiResponse<IMessage[]>>(
      `${environment.messagesUrl}/user/${user}`,
      {
        withCredentials: true,
      }
    );
  }

  getUnreadMessages(user: string): Observable<ApiResponse<IMessage[]>> {
    return this.http.post<ApiResponse<IMessage[]>>(
      `${environment.messagesUrl}/user/${user}/unread`,
      {
        withCredentials: true,
      }
    );
  }

  markMessagesAsRead(sender: string): Observable<ApiResponse<IMessage[]>> {
    const url = `${environment.messagesUrl}/user/${sender}/mark-as-read`;
    return this.http.post<ApiResponse<IMessage[]>>(url, {});
  }
}
