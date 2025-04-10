import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { IMessage } from '../interfaces/message.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket | null = null;

  sendMessage(event: string, message: IMessage) {
    this.socket?.emit(event, message);
  }

  onMessage(event: string): Observable<IMessage> {
    return new Observable((observer) => {
      this.socket?.on(event, (data: IMessage) => {
        observer.next(data);
      });
    });
  }

  connect() {
    if (this.socket) this.socket.disconnect();

    this.socket = io(environment.socketUrl, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });
  }

  disconnect() {
    this.socket?.disconnect();
  }
}
