import { Component, inject } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';
import { ClassDialogComponent } from '../class-dialog/class-dialog.component';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';
import { environment } from '../../../../environments/environment';
import { IClass } from '../../../core/interfaces/class.interface';
import { MatIconModule } from '@angular/material/icon';
import { IUser } from '../../../core/interfaces/user.interface';
import { IClassType } from '../../../core/interfaces/class-type.interface';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [NgIf, NgFor, HttpClientModule, MatDialogModule, MatIconModule],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css',
})
export class ClassListComponent {
  readonly dialog = inject(MatDialog);
  trainers: IUser[] | null = null;
  classTypes: IClassType[] | null = null;
  classes: IClass[] | null = null;

  constructor(private http: HttpClient) {
    this.getClasses();
    this.getTrainers();
    this.getClassTypes();
  }

  getClasses() {
    try {
      this.http.get<any>(environment.classesUrl).subscribe((res) => {
        this.classes = res.data;
      });
    } catch (error: any) {
      this.classes = null;
    }
  }

  getClassTypes() {
    try {
      this.http.get<any>(environment.classTypesUrl).subscribe((res) => {
        this.classTypes = res.data;
      });
    } catch (error: any) {}
  }

  getTrainers() {
    try {
      this.http.get<any>(environment.trainersUrl).subscribe((res) => {
        this.trainers = res.data;
      });
    } catch (error: any) {}
  }

  addClass(): void {
    this.openDialog(ClassDialogComponent, {
      data: {
        title: 'Nueva Clase',
        action: 'post',
        trainers: this.trainers,
        classTypes: this.classTypes,
      },
    });
  }

  updateClass(class_a: IClass) {
    this.openDialog(ClassDialogComponent, {
      data: {
        title: 'Modificar Clase',
        action: 'put',
        classType: class_a,
      },
    });
  }

  deleteClass(id: string) {
    this.openDialog(DeleteDialogComponent, {
      data: {
        id: id,
        url: environment.classesUrl,
        title: 'Eliminar Clase',
      },
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, data);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') this.getClasses();
    });
  }
}
