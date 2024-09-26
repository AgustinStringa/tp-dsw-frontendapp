import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { ClassTypeDialogComponent } from '../class-type-dialog/class-type-dialog.component';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';
import { environment } from '../../../../environments/environment';
import { IClassType } from '../../../core/interfaces/class-type.interface';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-class-type-list',
  standalone: true,
  imports: [NgIf, NgFor, HttpClientModule],
  templateUrl: './class-type-list.component.html',
  styleUrl: './class-type-list.component.css',
})
export class ClassTypeListComponent {
  readonly dialog = inject(MatDialog);
  classTypes: IClassType[] = [];

  constructor(private http: HttpClient) {
    this.getClassTypes();
  }

  getClassTypes() {
    try {
      this.http.get<any>(environment.classesUrl + '/types').subscribe((res) => {
        this.classTypes = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  addClassType(): void {
    this.openDialog(ClassTypeDialogComponent, {
      data: {
        title: 'Nuevo tipo de clase',
        action: 'post',
      },
    });
  }

  updateClassType(classType: IClassType) {
    this.openDialog(ClassTypeDialogComponent, {
      data: {
        title: 'Modificar tipo de clase',
        action: 'put',
        classType: classType,
      },
    });
  }

  deleteClassType(id: string) {
    this.openDialog(DeleteDialogComponent, {
      data: {
        id: id,
        url: environment.classTypesUrl,
        title: 'Eliminar tipo de clase',
      },
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, data);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') {
        this.getClassTypes();
      }
    });
  }
}
