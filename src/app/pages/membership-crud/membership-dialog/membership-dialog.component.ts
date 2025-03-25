import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
import { environment } from '../../../../environments/environment';
import { IMembership } from '../../../core/interfaces/membership.interface';
import { IMembershipType } from '../../../core/interfaces/membership-type.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { SnackbarService } from '../../../services/snackbar.service';

interface DialogData {
  title: string;
  action: string;
  membership: IMembership | undefined;
}

@Component({
  selector: 'app-membership-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
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
    public dialogRef: MatDialogRef<MembershipDialogComponent>,
    private snackbarService: SnackbarService,
    private http: HttpClient
  ) {
    this.title = data.title;
    this.action = data.action;

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
      typeId: form.type.value,
      clientId: form.client.value,
    };

    if (this.action === 'post') {
      this.http.post<any>(environment.membershipsUrl, data).subscribe({
        next: () => {
          this.closeDialog('created');
        },
        error: (error) => {
          this.snackbarService.showError('Error al crear la membresía');
        },
      });
    } else if (this.action == 'put') {
      this.http
        .put<any>(environment.membershipsUrl + '/' + this.membershipId, data)
        .subscribe({
          next: () => {
            this.closeDialog('updated');
          },
          error: () => {
            this.snackbarService.showError('Error al modificar la membresía');
          },
        });
    }
  }

  getClients() {
    this.http.get<any>(environment.clientsUrl).subscribe({
      next: (res) => {
        this.clients = res.data;
      },
      error: () => {
        this.snackbarService.showError('Error al obtener los clientes');
      },
    });
  }

  getMembershipTypes() {
    this.http.get<any>(environment.membershipTypesUrl).subscribe({
      next: (res) => {
        this.membershipTypes = res.data;
      },
      error: () => {
        this.snackbarService.showError(
          'Error al obtener los tipos de membresías'
        );
      },
    });
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }
}
