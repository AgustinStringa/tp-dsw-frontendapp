import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { environment } from '../../environments/environment';
import { IMembershipType } from '../core/interfaces/membership-type.interface';
import { MatIconModule } from '@angular/material/icon';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { MembershipTypesDialogComponent } from '../membership-types-dialog/membership-types-dialog.component.js';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component.js';
@Component({
  selector: 'app-membership-types-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule, MatIconModule],
  templateUrl: './membership-types-list.component.html',
  styleUrl: './membership-types-list.component.css',
})
export class MembershipTypesListComponent {
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
    this.openDialog(MembershipTypesDialogComponent, {
      title: 'Nuevo tipo de membresía',
      action: 'post',
      url: environment.membershipTypesUrl,
    });
  }
  updateMembershipType(membershipType: IMembershipType): void {
    this.openDialog(MembershipTypesDialogComponent, {
      title: 'Modificar tipo de membresía',
      action: 'put',
      membershipType: membershipType,
      url: environment.membershipTypesUrl,
    });
  }
  deleteMembershipType(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      entity: 'membershiptype',
      title: 'Eliminar tipo de membresía',
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
