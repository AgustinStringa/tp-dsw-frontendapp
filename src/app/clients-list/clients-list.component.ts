import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { environment } from '../../environments/environment';
import { IUser } from '../core/interfaces/user.interface';
@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule, MatIconModule],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css',
})
export class ClientsListComponent {
  clients: IUser[] | null = null;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.getClients();
  }

  getClients() {
    try {
      this.http.get<any>(environment.clientsUrl).subscribe((res) => {
        this.clients = res.data;
      });
    } catch (error: any) {
      this.clients = null;
      console.log(error);
    }
  }

  addUser(): void {
    this.openDialog(ClientDialogComponent, {
      title: 'Nuevo cliente',
      action: 'post',
      url: environment.clientsUrl,
    });
  }

  updateUser(client: IUser) {
    this.openDialog(ClientDialogComponent, {
      title: 'Modificar cliente',
      action: 'put',
      client: client,
      url: environment.clientsUrl,
    });
  }

  deleteUser(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      entity: 'client',
      title: 'Eliminar cliente',
      url: environment.clientsUrl,
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') {
        this.getClients();
      }
    });
  }
}
