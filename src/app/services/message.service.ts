import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.js';

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
}
