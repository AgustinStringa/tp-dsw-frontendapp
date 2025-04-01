import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component.js';
import { IMembershipType } from '../../../core/interfaces/membership-type.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MembershipTypeDialogComponent } from '../membership-type-dialog/membership-type-dialog.component.js';
import { MembershipTypeService } from '../../../core/services/membership-type.service.js';

@Component({
  selector: 'app-membership-types-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './membership-type-list.component.html',
  styleUrl: './membership-type-list.component.css',
})
export class MembershipTypeListComponent {
  membershipTypes: IMembershipType[] | null = null;

  constructor(
    private membershipTypeService: MembershipTypeService,
    private dialog: MatDialog
  ) {
    this.getMembershipTypes();
  }

  getMembershipTypes() {
    this.membershipTypeService.getAll().subscribe({
      next: (res) => {
        this.membershipTypes = res.data;
      },
      error: () => {
        this.membershipTypes = null;
      },
    });
  }

  addMembershipType(): void {
    this.openDialog(MembershipTypeDialogComponent, {
      data: {
        title: 'Nuevo Tipo de Membresía',
        action: 'post',
      },
    });
  }

  updateMembershipType(membershipType: IMembershipType): void {
    this.openDialog(MembershipTypeDialogComponent, {
      data: {
        title: 'Modificar Tipo de Membresía',
        action: 'put',
        membershipType: membershipType,
      },
    });
  }

  deleteMembershipType(id: string): void {
    this.openDialog(DeleteDialogComponent, {
      data: {
        id: id,
        title: 'Eliminar Tipo de Membresía',
        service: this.membershipTypeService,
      },
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, data);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') {
        this.getMembershipTypes();
      }
    });
  }
}
