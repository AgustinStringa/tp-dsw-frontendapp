import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component.js';
import { environment } from '../../../../environments/environment';
import { IMembershipType } from '../../../core/interfaces/membership-type.interface';
import { MembershipTypeDialogComponent } from '../membership-type-dialog/membership-type-dialog.component.js';

@Component({
  selector: 'app-membership-types-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule, MatIconModule],
  templateUrl: './membership-type-list.component.html',
  styleUrl: './membership-type-list.component.css',
})
export class MembershipTypeListComponent {
  membershipTypes: IMembershipType[] | null = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.getMembershipTypes();
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
      title: 'Nuevo Tipo de Membresía',
      action: 'post',
      url: environment.membershipTypesUrl,
    });
  }

  updateMembershipType(membershipType: IMembershipType): void {
    this.openDialog(MembershipTypeDialogComponent, {
      title: 'Modificar Tipo de Membresía',
      action: 'put',
      membershipType: membershipType,
      url: environment.membershipTypesUrl,
    });
  }

  deleteMembershipType(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      entity: 'membershiptype',
      title: 'Eliminar Tipo de Membresía',
      url: environment.membershipTypesUrl,
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') {
        this.getMembershipTypes();
      }
    });
  }
}
