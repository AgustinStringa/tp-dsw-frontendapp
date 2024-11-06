import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { environment } from '../../../../environments/environment';
import { IUser } from '../../../core/interfaces/user.interface';
import { UserDialogComponent } from '../../../user-dialog/user-dialog.component';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [FormsModule, MatIconModule, NgFor, NgIf],
  templateUrl: './client-list.component.html',
  styleUrls: [
    '../../../../assets/styles/filter-container.css',
    './client-list.component.css',
  ],
})
export class ClientListComponent {
  clients: IUser[] | null = null;
  filteredClients: IUser[] | null = null;
  nameFilter: string = '';

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.getClients();
  }

  getClients() {
    this.http.get<any>(environment.clientsUrl).subscribe({
      next: (res) => {
        this.clients = res.data;
        this.filteredClients = this.clients ? [...this.clients] : [];
      },
      error: () => {
        this.clients = null;
      },
    });
  }

  addUser(): void {
    this.openDialog(UserDialogComponent, {
      data: {
        title: 'Nuevo Cliente',
        action: 'post',
        url: environment.clientsUrl,
      },
    });
  }

  updateUser(client: IUser) {
    this.openDialog(UserDialogComponent, {
      data: {
        title: 'Modificar Cliente',
        action: 'put',
        user: client,
        url: environment.clientsUrl,
      },
    });
  }

  deleteUser(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      data: {
        id: id,
        title: 'Eliminar Cliente',
        url: environment.clientsUrl,
      },
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, data);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') {
        this.getClients();
      }
    });
  }

  applyFilter() {
    this.filteredClients = this.clients ? [...this.clients] : [];

    if (this.nameFilter) {
      this.filteredClients = this.filteredClients.filter((client) => {
        if (
          `${client.lastName} ${client.firstName}`.match(
            new RegExp(this.nameFilter, 'i')
          )
        )
          return true;
        if (
          `${client.firstName} ${client.lastName}`.match(
            new RegExp(this.nameFilter, 'i')
          )
        )
          return true;
        return false;
      });
    }
  }

  clearFilters() {
    this.nameFilter = '';
    this.applyFilter();
  }
}
