import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../services/socket.service.js';
import { IUser } from '../../core/interfaces/user.interface.js';
import { MessageService } from '../../services/message.service.js';
import { AuthService } from '../../services/auth.service.js';
import { UserSelectionComponent } from './user-selection/user-selection.component.js';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, UserSelectionComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  message: string = '';
  messages: string[] = [];
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
      this.messages.push(data.content);
    });
  }

  onUserSelected(user: IUser) {
    this.selectedUser = user;
    this.messageService
      .getMessagesFrom(this.userId, this.selectedUser.id)
      .subscribe({
        next: (response) => {
          console.log('Mensajes con el usuario:', response.data);

          response.data.forEach((element: any) => {
            this.messages.push(element.content);
          });
        },
        error: (error) => {
          console.error('Error obteniendo mensajes:', error);
        },
      });
  }

  sendMessage() {
    if (this.message.trim() && this.selectedUser) {
      const messageData = {
        content: this.message,
        receiver: this.selectedUser.id,
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
