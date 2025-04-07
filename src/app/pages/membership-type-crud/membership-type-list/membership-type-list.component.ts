import { Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { FormsModule } from '@angular/forms';
import { IMembershipType } from '../../../core/interfaces/membership-type.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MembershipTypeDialogComponent } from '../membership-type-dialog/membership-type-dialog.component';
import { MembershipTypeService } from '../../../core/services/membership-type.service';

@Component({
  selector: 'app-membership-types-list',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './membership-type-list.component.html',
  styleUrls: [
    './membership-type-list.component.css',
    '../../../../assets/styles/filter-container.css',
  ],
})
export class MembershipTypeListComponent {
  membershipTypes: IMembershipType[] | null = null;
  filteredMembershipTypes: IMembershipType[] | null = null;
  nameFilter = '';

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
        this.filteredMembershipTypes = [...res.data];
      },
      error: () => {
        this.membershipTypes = null;
        this.filteredMembershipTypes = null;
      },
    });
  }

  applyFilter() {
    if (!this.membershipTypes) {
      this.filteredMembershipTypes = null;
      return;
    }

    this.filteredMembershipTypes = [...this.membershipTypes];

    if (this.nameFilter) {
      const searchTerm = this.nameFilter.toLowerCase();
      this.filteredMembershipTypes = this.filteredMembershipTypes.filter((mt) =>
        mt.name.toLowerCase().includes(searchTerm)
      );
    }
  }

  clearFilters() {
    this.nameFilter = '';
    this.applyFilter();
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
