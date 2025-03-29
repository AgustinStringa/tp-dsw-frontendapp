import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ClassTypeDialogComponent } from '../class-type-dialog/class-type-dialog.component';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { environment } from '../../../../environments/environment';
import { IClassType } from '../../../core/interfaces/class-type.interface';
import { ComponentType } from '@angular/cdk/portal';
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

  constructor(private http: HttpClient) {
    this.getClassTypes();
  }

  getClassTypes() {
    try {
      this.http.get<any>(environment.classesUrl + '/types').subscribe((res) => {
        this.classTypes = res.data;
      });
    } catch (error: any) {
      this.classTypes = null;
    }
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
      url: environment.classTypesUrl,
      title: 'Eliminar Tipo de Clase',
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
