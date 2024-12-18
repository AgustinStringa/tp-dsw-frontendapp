import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';
import { SocketService } from '../../services/socket.service.js';
import { TrainerSelectionComponent } from './trainer-selection/trainer-selection.component.js';
import { IUser } from '../../core/interfaces/user.interface.js';

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

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.onMessage('respuesta').subscribe((data: string) => {
      this.messages.push(data);
    });
  }

  onTrainerSelected(trainer: IUser) {
    this.selectedTrainer = trainer;
  }

  sendMessage() {
    if (this.message.trim()) {
      this.socketService.sendMessage('mensaje', this.message);
      this.message = '';
    }
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
