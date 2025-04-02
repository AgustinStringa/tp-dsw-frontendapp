import { Component, inject } from '@angular/core';
import { ClassTypeDialogComponent } from '../class-type-dialog/class-type-dialog.component';
import { ClassTypeService } from '../../../core/services/class-type.service';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { IClassType } from '../../../core/interfaces/class-type.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-class-type-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './class-type-list.component.html',
  styleUrl: './class-type-list.component.css',
})
export class ClassTypeListComponent {
  readonly dialog = inject(MatDialog);
  classTypes: IClassType[] | null = null;

  constructor(private classTypeService: ClassTypeService) {
    this.getClassTypes();
  }

  getClassTypes() {
    this.classTypeService.getAll().subscribe({
      next: (res) => {
        this.classTypes = res.data;
      },
      error: () => {
        this.classTypes = null;
      },
    });
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
