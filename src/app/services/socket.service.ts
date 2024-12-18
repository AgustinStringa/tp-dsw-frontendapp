import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  sendMessage(event: string, message: any): void {
    this.socket.emit(event, message);
  }

  onMessage(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });
    });
  }
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  reconnect(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }
}
