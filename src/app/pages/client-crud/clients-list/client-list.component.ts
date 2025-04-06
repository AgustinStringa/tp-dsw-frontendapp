import { Component, ViewChild } from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { ClientService } from '../../../core/services/client.service';
import { ComponentType } from '@angular/cdk/portal';
import { CustomPaginatorIntl } from '../../../core/classes/custom-paginator-intl';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { FormsModule } from '@angular/forms';
import { IUser } from '../../../core/interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
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
  clientsExist = false;
  clientsPage: IUser[] | null = null;
  pageSize = 50;

  constructor(private dialog: MatDialog, public clientService: ClientService) {}

  addUser(): void {
    this.openDialog(UserDialogComponent, {
      data: {
        title: 'Nuevo Cliente',
        action: 'post',
        crudService: this.clientService,
      },
    });
  }

  updateUser(client: IUser) {
    this.openDialog(UserDialogComponent, {
      data: {
        title: 'Modificar Cliente',
        action: 'put',
        user: client,
        crudService: this.clientService,
      },
    });
  }

  deleteUser(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      data: {
        id: id,
        title: 'Eliminar Cliente',
        service: this.clientService,
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
