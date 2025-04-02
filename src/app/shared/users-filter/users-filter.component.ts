import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../core/interfaces/user.interface';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: [
    '../../../assets/styles/filter-container.css',
    './users-filter.component.css',
  ],
})
export class UsersFilterComponent {
  @Output() filteredUsersEvent = new EventEmitter<{
    users: IUser[];
    usersExist: boolean;
  } | null>();

  users: IUser[] | null = null;
  filteredUsers: IUser[] | null = null;

  nameFilter = '';

  constructor() {
    this.getUsers();
  }

  getUsers() {
    //TODO si se filtran trainers en el futuro, pasarle como parámetro al componente la colección a filtrar y decidir ruta con if.
    this.http.get<any>(environment.clientsUrl).subscribe({
      next: (res) => {
        this.users = res.data;
        this.filteredUsers = this.users ? [...this.users] : [];
        this.applyFilter();
      },
      error: () => {
        this.users = null;
      },
    });
  }

  applyFilter() {
    this.filteredUsers = this.users ? [...this.users] : [];

    if (this.nameFilter) {
      this.filteredUsers = this.filteredUsers.filter((user) => {
        if (
          `${user.lastName} ${user.firstName}`.match(
            new RegExp(this.nameFilter, 'i')
          )
        )
          return true;
        if (
          `${user.firstName} ${user.lastName}`.match(
            new RegExp(this.nameFilter, 'i')
          )
        ) {
          return true;
        }

        return false;
      });
    }
    this.sendFilteredUsers();
  }

  clearFilters() {
    this.nameFilter = '';
    this.applyFilter();
  }

  sendFilteredUsers() {
    if (this.users && this.filteredUsers) {
      this.filteredUsersEvent.emit({
        users: this.filteredUsers,
        usersExist: this.users.length > 0,
      });
    } else {
      this.filteredUsersEvent.emit(null);
    }
  }
}
