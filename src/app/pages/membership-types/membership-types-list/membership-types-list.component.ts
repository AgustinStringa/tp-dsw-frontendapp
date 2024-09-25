import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment.js';
import { IMembershipType } from '../../../core/interfaces/membership-type.interface.js';
import { MembershipTypeDialogComponent } from '../membership-type-dialog/membership-type-dialog.component.js';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component.js';

export interface DialogMembershipTypeData {
  membershipType: IMembershipType;
  action: string;
  title: string;
}

@Component({
  selector: 'app-membership-types-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule, MatIconModule, RouterLink],
  templateUrl: './membership-types-list.component.html',
  styleUrl: './membership-types-list.component.css',
})
export class MembershipTypesListComponent {
  membershipTypes: IMembershipType[] | null = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.getMembershipTypes();
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result !== 'none') {
        this.getMembershipTypes();
      }
    });
  }

  getMembershipTypes() {
    try {
      this.http.get<any>(environment.membershipTypesUrl).subscribe((res) => {
        this.membershipTypes = res.data;
      });
    } catch (error: any) {
      this.membershipTypes = null;
      console.log(error);
    }
  }

  addMembershipType(): void {
    this.openDialog(MembershipTypeDialogComponent, {
      title: 'Crear Tipo de Membersía',
      action: 'post',
    });
  }

  updateMembershipType(mt: IMembershipType): void {
    this.openDialog(MembershipTypeDialogComponent, {
      membershipType: mt,
      title: 'Editar Tipo de Membresía',
      url: environment.membershipTypesUrl,
      action: 'put',
    });
  }

  deleteMembershipType(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      title: 'Eliminar Tipo de Membresía',
      url: environment.membershipTypesUrl,
    });
  }

  getRouterLink(id: string) {
    //TO DO: hacer el endpoint
    return `/membershiptypes/${id}/active`;
  }
}
