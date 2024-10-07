import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
} from '@angular/material/dialog';
import { IMembership } from '../core/interfaces/membership.interface.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment.js';
import { IUser } from '../core/interfaces/user.interface.js';
import { IMembershipType } from '../core/interfaces/membership-type.interface.js';
import { NgForOf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-memberships-dialog',
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
  ],
  templateUrl: './memberships-dialog.component.html',
  styleUrl: './memberships-dialog.component.css',
})
export class MembershipsDialogComponent {
  title: string = '';
  action: string = '';
  membershipId: string | undefined;

  form = new FormGroup({
    dateFrom: new FormControl('', [Validators.required]),
    dateTo: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    client: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      action: string;
      clients: IUser[];
      types: IMembershipType[];
      membership?: IMembership;
      activeMemberships: { [clientId: string]: IMembership | null };
    },
    public dialogRef: MatDialogRef<MembershipsDialogComponent>,
    private http: HttpClient
  ) {
    this.title = data.title;
    this.action = data.action;

    if (data.membership !== undefined) {
      const form = this.form.controls;
      this.membershipId = data.membership.id;

      form.dateFrom.setValue(data.membership.dateFrom.toISOString());
      form.dateTo.setValue(data.membership.dateTo.toISOString());
      form.type.setValue(data.membership.type.id);
      form.client.setValue(data.membership.client.id);
    }
  }

  onSubmit(): void {
    const selectedClientId = this.form.get('client')?.value;

    if (selectedClientId && this.data.activeMemberships[selectedClientId]) {
      alert('El cliente ya tiene una membresía activa');
      return;
    }

    let data: Record<string, any> = {
      dateFrom: this.form.get('dateFrom')?.value,
      dateTo: this.form.get('dateTo')?.value,
      type: this.form.get('type')?.value,
      client: this.form.get('client')?.value,
    };

    if (this.action === 'post') {
      try {
        this.http
          .post<any>(environment.membershipsUrl, data)
          .subscribe((info) => {
            this.dialogRef.close('created');
          });
      } catch (error: any) {
        console.log(error);
      }
    } /*else if (this.action == 'put') {
      try {
        this.http
          .put<any>(
            environment.membershipTypesUrl + '/' + this.membershipId,
            data
          )
          .subscribe();
        this.closeModal();
      } catch (error: any) {
        console.log(error);
      }
    }*/
    console.log(data);
  }
}
