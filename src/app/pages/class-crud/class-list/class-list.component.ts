import { Component, inject } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { ClassDialogComponent } from '../class-dialog/class-dialog.component';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';
import { environment } from '../../../../environments/environment';
import { IClass } from '../../../core/interfaces/class.interface';
import { IClassType } from '../../../core/interfaces/class-type.interface';
import { IUser } from '../../../core/interfaces/user.interface';

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
      title: 'Nueva Clase',
      action: 'post',
      trainers: this.trainers,
      classTypes: this.classTypes,
      httpClient: this.http,
    });
  }

  updateClass(class_a: IClass) {
    this.openDialog(ClassDialogComponent, {
      title: 'Modificar Clase',
      action: 'put',
      trainers: this.trainers,
      classTypes: this.classTypes,
      class_a: class_a,
      httpClient: this.http,
    });
  }

  deleteClass(id: string) {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      url: environment.classesUrl,
      title: 'Eliminar Clase',
      httpClient: this.http,
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') this.getClasses();
    });
  }

  getDayName(dayNumber: number) {
    switch (dayNumber) {
      case 1:
        return 'Lunes';
      case 2:
        return 'Martes';
      case 3:
        return 'Miércoles';
      case 4:
        return 'Jueves';
      case 5:
        return 'Viernes';
      case 6:
        return 'Sábado';
      case 7:
        return 'Domingo';
      default:
        return 'Error';
    }
  }
}
