import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../../environments/environment.js';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../core/interfaces/user.interface.js';
import { AuthService } from '../../../services/auth.service.js';
@Component({
  selector: 'app-user-selection',
  standalone: true,
  imports: [],
  templateUrl: './user-selection.component.html',
  styleUrl: './user-selection.component.css',
})
export class UserSelectionComponent {
  @Output() userSelected = new EventEmitter<IUser>();
  users: IUser[] = [];
  selectedUser: IUser | null = null;
  entity: string = '';

  constructor(private http: HttpClient, private auth: AuthService) {
    if (this.auth.getUser()?.isClient) {
      this.getTrainers();
    } else {
      this.getClients();
    }
  }
  getClients() {
    this.http.get<any>(environment.clientsUrl).subscribe({
      next: (res) => {
        this.users = res.data;
      },
      error: () => {
        console.error('Error al obtener los clientes');
      },
    });
    this.entity = 'Clientes';
  }
  getTrainers() {
    this.http.get<any>(environment.trainersUrl).subscribe({
      next: (res) => {
        this.users = res.data;
      },
      error: () => {
        console.error('Error al obtener los entrenadores');
      },
    });
    this.entity = 'Entrenadores';
  }

  selectUser(user: IUser) {
    this.selectedUser = user;
    this.userSelected.emit(this.selectedUser);
  }
}
