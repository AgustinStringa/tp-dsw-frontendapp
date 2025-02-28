import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../services/socket.service.js';
import { IUser } from '../../core/interfaces/user.interface.js';
import { MessageService } from '../../services/message.service.js';
import { AuthService } from '../../services/auth.service.js';
import { UserSelectionComponent } from './user-selection/user-selection.component.js';
import IMessage from '../../core/interfaces/IMessage.interface.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, UserSelectionComponent, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  message: string = '';
  messages: IMessage[] = [];
  selectedUser: IUser | null = null;
  userId: string;
  isClient: boolean;

  constructor(
    private socketService: SocketService,
    private messageService: MessageService,
    auth: AuthService
  ) {
    const user = auth.getUser();
    this.userId = user ? user.id : '';
    this.isClient = user ? user.isClient : false;
  }

  ngOnInit() {
    this.socketService.onMessage('respuesta').subscribe((data: any) => {
      if (
        data.sender === this.selectedUser?.id ||
        data.receiver === this.selectedUser?.id
      ) {
        this.messages.push(data);
      }
    });
  }

  onUserSelected(user: IUser) {
    this.selectedUser = user;
    this.messageService
      .getMessagesFrom(this.userId, this.selectedUser.id)
      .subscribe({
        next: (response) => {
          console.log('Mensajes con el usuario:', response.data);

          this.messages = response.data;
        },
        error: (error) => {
          console.error('Error obteniendo mensajes:', error);
        },
      });
  }

  sendMessage() {
    if (this.message.trim() && this.selectedUser) {
      const messageData: IMessage = {
        content: this.message,
        sender: this.userId,
        receiver: this.selectedUser.id,
        createdAt: new Date(),
        entity: this.isClient ? 'client' : 'trainer',
      };
      this.socketService.sendMessage('message', JSON.stringify(messageData));
      this.message = '';
    }
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
