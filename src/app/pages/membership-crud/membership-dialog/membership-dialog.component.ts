import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { environment } from '../../../../environments/environment.js';
import { IMembership } from '../../../core/interfaces/membership.interface.js';
import { IMembershipType } from '../../../core/interfaces/membership-type.interface.js';
import { IUser } from '../../../core/interfaces/user.interface.js';

interface DialogData {
  title: string;
  action: string;
  http: HttpClient;
  membership: IMembership | undefined;
}

@Component({
  selector: 'app-membership-dialog',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    NgForOf,
    MatDialogModule,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './membership-dialog.component.html',
  styleUrl: './membership-dialog.component.css',
})
export class MembershipDialogComponent {
  title: string;
  action: string;
  http: HttpClient;
  membershipId: string | undefined;
  clients: IUser[] | undefined;
  membershipTypes: IMembershipType[] | undefined;

  form = new FormGroup({
    type: new FormControl('', [Validators.required]),
    client: new FormControl('', [Validators.required]),
    //isPaid: new FormControl(),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<MembershipDialogComponent>
  ) {
    this.title = data.title;
    this.action = data.action;
    this.http = data.http;

    this.getClients();
    this.getMembershipTypes();

    if (data.membership !== undefined) {
      const form = this.form.controls;
      this.membershipId = data.membership.id;

      form.type.setValue(data.membership.type.id);
      form.client.setValue(data.membership.client.id);
    }
  }

  onSubmit(): void {
    const form = this.form.controls;

    let data: Record<string, any> = {
      type: form.type.value,
      client: form.client.value,
    };

    if (this.action === 'post') {
      this.http.post<any>(environment.membershipsUrl, data).subscribe({
        next: () => {
          this.closeDialog('created');
        },
        error: (error) => {
          console.error('Error en la petición:', error);
          //poner snackbar
        },
      });
    } else if (this.action == 'put') {
      this.http
        .put<any>(environment.membershipsUrl + '/' + this.membershipId, data)
        .subscribe({
          next: () => {
            this.closeDialog('updated');
          },
          error: (error) => {
            console.error('Error en la petición:', error);
            //poner snackbar
          },
        });
    }
  }

  getClients() {
    this.http.get<any>(environment.clientsUrl).subscribe({
      next: (res) => {
        this.clients = res.data;
      },
      error: (error) => {
        console.error('Error en la petición:', error);
        //poner snackbar
      },
    });
  }

  getMembershipTypes() {
    this.http.get<any>(environment.membershipTypesUrl).subscribe({
      next: (res) => {
        this.membershipTypes = res.data;
      },
      error: (error) => {
        console.error('Error en la petición:', error);
        //poner snackbar
      },
    });
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }
}
