import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientService } from '../../core/services/client.service';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../core/interfaces/user.interface';
import { TrainerService } from '../../core/services/trainer.service';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['../../../assets/styles/filter-container.css'],
})
export class UsersFilterComponent implements OnInit {
  @Input({ required: true }) crudService!: TrainerService | ClientService;

  @Output()
  filteredUsersEvent = new EventEmitter<{
    users: IUser[];
    usersExist: boolean;
  } | null>();

  users: IUser[] | null = null;
  filteredUsers: IUser[] | null = null;

  nameFilter = '';
  dniFilter = '';

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.crudService.getAll().subscribe({
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

    if (this.dniFilter) {
      const dniSearchTerm = this.dniFilter.toLowerCase();
      this.filteredUsers = this.filteredUsers.filter((user) => {
        return user.dni?.toLowerCase().includes(dniSearchTerm);
      });
    }

    this.sendFilteredUsers();
  }

  clearFilters() {
    this.nameFilter = '';
    this.dniFilter = '';
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
