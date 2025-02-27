import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';
import { SocketService } from '../../services/socket.service.js';
import { TrainerSelectionComponent } from './trainer-selection/trainer-selection.component.js';
import { IUser } from '../../core/interfaces/user.interface.js';
import { MessageService } from '../../services/message.service.js';
import { AuthService } from '../../services/auth.service.js';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, TrainerSelectionComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  message: string = '';
  messages: string[] = [];
  selectedTrainer: IUser | null = null;
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
    if (!this.isClient) {
      this.messageService.getMessagesForTrainer(this.userId).subscribe({
        next: (response) => {
          console.log('Mensajes pendientes:', response.data);

          response.data.forEach((element: any) => {
            this.messages.push(element.content);
          });
        },
        error: (error) => {
          console.error('Error obteniendo mensajes:', error);
        },
      });
    }

    if (this.isClient) {
      this.messageService.getMessageForClient(this.userId).subscribe({
        next: (response) => {
          console.log('Mensajes pendientes:', response.data);

          response.data.forEach((element: any) => {
            this.messages.push(element.content);
          });
        },
        error: (error) => {
          console.error('Error obteniendo mensajes:', error);
        },
      });
    }
  }

  onTrainerSelected(trainer: IUser) {
    this.selectedTrainer = trainer;
  }

  sendMessage() {
    if (this.message.trim() && this.selectedTrainer) {
      const messageData = {
        content: this.message,
        trainerId: this.selectedTrainer.id,
      };
      this.socketService.sendMessage('message', JSON.stringify(messageData));
      this.message = '';
    }
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
