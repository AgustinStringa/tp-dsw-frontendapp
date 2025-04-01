import { Component, ViewChild } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { CustomPaginatorIntl } from '../../../core/classes/custom-paginator-intl';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { environment } from '../../../../environments/environment';
import { IUser } from '../../../core/interfaces/user.interface';
import { UserDialogComponent } from '../../../shared/user-dialog/user-dialog.component';
import { UsersFilterComponent } from '../../../shared/users-filter/users-filter.component';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    UsersFilterComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
})
export class ClientListComponent {
  @ViewChild(UsersFilterComponent) filter!: UsersFilterComponent;

  clients: IUser[] | null = null;
  clientsExist: boolean = false;
  clientsPage: IUser[] | null = null;
  pageSize: number = 50;

  constructor(private dialog: MatDialog) {}

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
        this.filter.getUsers();
      }
    });
  }

  receiveClients(data: { users: IUser[]; usersExist: boolean } | null) {
    if (data === null) this.clients = null;
    else {
      this.clients = data.users;
      this.clientsExist = data.usersExist;

      const e = new PageEvent();
      e.length = this.clients.length;
      e.pageIndex = 0;
      e.pageSize = this.pageSize;
      this.handlePageEvent(e);
    }
  }

  handlePageEvent(e: PageEvent) {
    if (this.clients !== null) {
      const start = e.pageIndex * e.pageSize;
      const end = (e.pageIndex + 1) * e.pageSize;

      this.clientsPage = [...this.clients.slice(start, end)];
    }
  }
}
