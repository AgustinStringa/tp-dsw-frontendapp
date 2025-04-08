import { Component, inject } from '@angular/core';
import { ClassTypeDialogComponent } from '../class-type-dialog/class-type-dialog.component';
import { ClassTypeService } from '../../../core/services/class-type.service';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { FormsModule } from '@angular/forms';
import { IClassType } from '../../../core/interfaces/class-type.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-class-type-list',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './class-type-list.component.html',
  styleUrls: [
    './class-type-list.component.css',
    '../../../../assets/styles/filter-container.css',
  ],
})
export class ClassTypeListComponent {
  readonly dialog = inject(MatDialog);
  classTypes: IClassType[] | null = null;
  filteredClassTypes: IClassType[] | null = null;
  nameFilter = '';

  constructor(private classTypeService: ClassTypeService) {
    this.getClassTypes();
  }

  getClassTypes() {
    this.classTypeService.getAll().subscribe({
      next: (res) => {
        this.classTypes = res.data;
        this.filteredClassTypes = [...res.data];
      },
      error: () => {
        this.classTypes = null;
        this.filteredClassTypes = null;
      },
    });
  }

  applyFilter() {
    if (!this.classTypes) {
      this.filteredClassTypes = null;
      return;
    }

    this.filteredClassTypes = [...this.classTypes];

    if (this.nameFilter) {
      const searchTerm = this.nameFilter.toLowerCase();
      this.filteredClassTypes = this.filteredClassTypes.filter((type) =>
        type.name.toLowerCase().includes(searchTerm)
      );
    }
  }

  clearFilters() {
    this.nameFilter = '';
    this.applyFilter();
  }

  addClassType(): void {
    this.openDialog(ClassTypeDialogComponent, {
      title: 'Nuevo Tipo de Clase',
      action: 'post',
    });
  }

  updateClassType(classType: IClassType) {
    this.openDialog(ClassTypeDialogComponent, {
      title: 'Modificar Tipo de Clase',
      action: 'put',
      classType: classType,
    });
  }

  deleteClassType(id: string) {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      title: 'Eliminar Tipo de Clase',
      service: this.classTypeService,
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') {
        this.getClassTypes();
      }
    });
  }
}
