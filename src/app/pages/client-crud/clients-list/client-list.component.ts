import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  imports: [NgFor, NgIf, HttpClientModule, MatIconModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
})
export class ClientListComponent {
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
    this.openDialog(UserDialogComponent, {
      title: 'Nuevo Cliente',
      action: 'post',
      url: environment.clientsUrl,
      httpClient: this.http,
    });
  }

  updateUser(client: IUser) {
    this.openDialog(UserDialogComponent, {
      title: 'Modificar Cliente',
      action: 'put',
      user: client,
      url: environment.clientsUrl,
      httpClient: this.http,
    });
  }

  deleteUser(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      title: 'Eliminar Cliente',
      url: environment.clientsUrl,
      httpClient: this.http,
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
