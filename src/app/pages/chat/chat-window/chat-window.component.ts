import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiResponse } from '../../../core/interfaces/api-response.interface.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.js';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import IMessage from '../../../core/interfaces/IMessage.interface.js';
import { IUser } from '../../../core/interfaces/user.interface.js';
import { MessageService } from '../../../core/services/message.service.js';
import { SocketService } from '../../../core/services/socket.service.js';
import { SoundUtils } from '../../../core/functions/playSound.js';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css',
})
export class ChatWindowComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  soundsEnabled = true;
  isChatOpen = false;
  isChatConnected = true;
  showSettingsMenu = false;
  totalUnreadMessages = 0;
  selectedUser: IUser | null = null;
  message = '';
  messages: IMessage[] = [];
  userId: string;
  isClient: boolean;
  unreadMessages: Record<string, number> = {};
  users: IUser[] = [];
  search = '';
  filteredUsers: IUser[] = [];
  constructor(
    private socketService: SocketService,
    private messageService: MessageService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    const user = this.authService.getUser();
    this.userId = user ? user.id : '';
    this.isClient = user ? user.isClient : false;
  }

  async ngOnInit() {
    await this.loadUsers();
    this.setupSocketListeners();
    await this.loadUnreadMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private setupSocketListeners() {
    this.socketService.onMessage('respuesta').subscribe((data: IMessage) => {
      const isMessageForCurrentUser = data.receiver === this.userId;
      const isFromSelectedChat = data.sender === this.selectedUser?.id;
      const isMessageSentByMe = data.sender === this.userId;

      if (
        isMessageForCurrentUser &&
        !isFromSelectedChat &&
        this.soundsEnabled
      ) {
        SoundUtils.notification();
      } else if (this.soundsEnabled) {
        SoundUtils.sendMessage();
      }
      if (
        data.sender === this.selectedUser?.id ||
        data.receiver === this.selectedUser?.id
      ) {
        this.messages.push(data);
      }
      if (
        isMessageForCurrentUser &&
        !isMessageSentByMe &&
        !isFromSelectedChat
      ) {
        this.unreadMessages[data.sender] =
          (this.unreadMessages[data.sender] || 0) + 1;
        this.calculateTotalUnread();
      }
    });
  }

  scrollToBottom(): void {
    try {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      console.error('Error al desplazar el scroll:', err);
    }
  }

  async loadUsers() {
    await this.getTrainers();
    await this.getClients();
  }

  async filterUsers() {
    if (!this.search) {
      this.filteredUsers = this.users ? [...this.users] : [];
      return;
    }

    this.filteredUsers = this.users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const searchTerm = this.search.toLowerCase();
      return fullName.includes(searchTerm);
    });
  }

  async toggleChatConnection() {
    this.isChatConnected = !this.isChatConnected;

    if (this.isChatConnected) {
      this.socketService.connect();
      this.setupSocketListeners();
      await this.loadUnreadMessages();
      if (this.selectedUser) {
        this.onUserSelected(this.selectedUser);
      }
    } else {
      this.socketService.disconnect();
      this.unreadMessages = {};
      this.totalUnreadMessages = 0;
      this.messages = [];
    }

    this.showSettingsMenu = false;
  }
  async getClients() {
    this.http.get<ApiResponse<IUser[]>>(environment.clientsUrl).subscribe({
      next: (res) => {
        const filteredClients = res.data.filter(
          (user: IUser) => user.id !== this.userId
        );
        this.users = [
          ...this.users,
          ...filteredClients.map(
            (user: IUser) =>
              ({
                ...user,
                entity: 'client',
              } as IUser)
          ),
        ];
        this.filterUsers();
      },
      error: () => {
        console.error('Error al obtener los clientes');
      },
    });
  }

  async getTrainers() {
    this.http.get<ApiResponse<IUser[]>>(environment.trainersUrl).subscribe({
      next: (res) => {
        const filteredTrainers = res.data.filter(
          (user: IUser) => user.id.toString() !== this.userId.toString()
        );
        this.users = [
          ...this.users,
          ...filteredTrainers.map(
            (user: IUser) =>
              ({
                ...user,
                entity: 'trainer',
              } as IUser)
          ),
        ];
        this.filterUsers();
      },
      error: () => {
        console.error('Error al obtener los entrenadores');
      },
    });
  }

  async loadUnreadMessages() {
    this.messageService.getUnreadMessages(this.userId).subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          response.data.forEach((msg: IMessage) => {
            if (msg.sender !== this.userId) {
              this.unreadMessages[msg.sender] =
                (this.unreadMessages[msg.sender] || 0) + 1;
            }
          });
          this.calculateTotalUnread();
        } else {
          console.error('La respuesta no contiene un array válido:', response);
        }
      },
      error: (error) => {
        console.error('Error cargando mensajes no leídos:', error);
      },
    });
  }

  calculateTotalUnread() {
    this.totalUnreadMessages = Object.values(this.unreadMessages).reduce(
      (acc, curr) => acc + curr,
      0
    );
  }

  onUserSelected(user: IUser) {
    this.selectedUser = user;
    this.unreadMessages[user.id] = 0;

    this.messageService.markMessagesAsRead(this.userId, user.id).subscribe({
      next: () => {
        // Successfully marked messages as read
      },
      error: (error) => {
        console.error('Error marcando mensajes como leídos:', error);
      },
    });

    this.messageService
      .getMessagesFrom(this.userId, this.selectedUser.id)
      .subscribe({
        next: (response) => {
          this.messages = response.data;
        },
        error: (error) => {
          console.error('Error obteniendo mensajes:', error);
        },
      });
    this.calculateTotalUnread();
  }

  sendMessage() {
    if (this.message.trim() && this.selectedUser) {
      const messageData: IMessage = {
        content: this.message,
        sender: this.userId,
        receiver: this.selectedUser.id,
        createdAt: new Date(),
        readAt: undefined,
        entity: this.isClient ? 'client' : 'trainer',
      };
      this.socketService.sendMessage('message', messageData);
      this.message = '';
    }
    this.scrollToBottom();
  }

  toggleSounds() {
    this.soundsEnabled = !this.soundsEnabled;
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
