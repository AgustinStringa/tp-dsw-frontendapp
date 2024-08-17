import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { User } from '../core/interfaces/user.interface';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css',
})
export class ClientsListComponent {
  url: string = '';
  clients: User[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.url = 'http://localhost:3000/api/clients';
    this.getClients();
  }

  async getClients() {
    try {
      this.http.get<any>(this.url).subscribe((res) => {
        this.clients = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  addUser(): void {
    this.openDialog(ClientDialogComponent, {
      title: 'Nuevo cliente',
      action: 'post',
    });
  }

  updateUser(id: string) {
    this.openDialog(ClientDialogComponent, {
      title: 'Modificar cliente',
      action: 'put',
      client: this.clients.find((client) => client.id === id),
    });
  }

  deleteUser(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      entity: 'client',
      title: 'Eliminar cliente',
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe(() => {
      this.getClients();
    });
  }
}
