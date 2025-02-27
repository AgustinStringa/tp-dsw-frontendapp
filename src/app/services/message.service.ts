import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.js';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getMessagesForTrainer(userId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/messages/trainer/${userId}`, {
      withCredentials: true,
    });
  }

  getMessageForClient(userId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/messages/client/${userId}`, {
      withCredentials: true,
    });
  }
}
