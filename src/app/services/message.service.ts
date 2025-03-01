import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.js';
import IMessage from '../core/interfaces/IMessage.interface.js';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getMessagesFrom(receiver: string, sender: string): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/messages/${receiver}/${sender}`,
      {
        withCredentials: true,
      }
    );
  }

  getUnreadMessages(receiver: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/messages/unread/${receiver}`, {
      withCredentials: true,
    });
  }

  markMessagesAsRead(sender: string, receiver: string): Observable<any> {
    const url = `${environment.apiUrl}/messages/mark-as-read/${sender}/${receiver}`;
    return this.http.post(url, {});
  }
}
