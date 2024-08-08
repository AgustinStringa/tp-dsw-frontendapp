import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';

interface IUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css',
})
export class ClientsListComponent {
  url: string = '';
  users: IUser[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.url = 'http://localhost:3000/api/clients';
    this.getClients();
  }

  async getClients() {
    try {
      this.http.get<any>(this.url).subscribe((res) => {
        this.users = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {
        title: 'Nuevo cliente',
        action: 'post',
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getClients();
    });
  }
}
