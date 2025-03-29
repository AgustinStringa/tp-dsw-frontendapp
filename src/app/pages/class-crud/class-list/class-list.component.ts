import { Component, inject } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { ClassDialogComponent } from '../class-dialog/class-dialog.component';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { environment } from '../../../../environments/environment';
import { IClass } from '../../../core/interfaces/class.interface';
import { IClassType } from '../../../core/interfaces/class-type.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [NgFor, MatDialogModule, MatIconModule, FormsModule],
  templateUrl: './class-list.component.html',
  styleUrls: [
    '../../../../assets/styles/filter-container.css',
    './class-list.component.css',
  ],
})
export class ClassListComponent {
  readonly dialog = inject(MatDialog);
  trainers: IUser[] | null = null;
  classTypes: IClassType[] | null = null;
  classes: IClass[] | null = null;
  filteredClasses: IClass[] | null = null;
  dayFilter: string = '';
  classTypeFilter: string = '';
  trainerFilter: string = '';

  constructor(private http: HttpClient) {
    this.getClasses();
    this.getTrainers();
    this.getClassTypes();
  }

  getClasses() {
    try {
      this.http.get<any>(environment.classesUrl).subscribe((res) => {
        this.classes = res.data;
        this.applyFilter();
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
    });
  }

  updateClass(class_a: IClass) {
    this.openDialog(ClassDialogComponent, {
      title: 'Modificar Clase',
      action: 'put',
      trainers: this.trainers,
      classTypes: this.classTypes,
      class_a: class_a,
    });
  }

  deleteClass(id: string) {
    this.openDialog(DeleteDialogComponent, {
      id: id,
      url: environment.classesUrl,
      title: 'Eliminar Clase',
    });
  }

  openDialog(dialog: ComponentType<unknown>, data: object): void {
    const dialogRef = this.dialog.open(dialog, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'none') this.getClasses();
    });
  }

  getDayName(dayNumber: number) {
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    return days[dayNumber];
  }

  clearFilters() {
    this.dayFilter = '';
    this.classTypeFilter = '';
    this.trainerFilter = '';
    this.applyFilter();
  }
  applyFilter() {
    this.filteredClasses = this.classes ? [...this.classes] : [];

    if (this.dayFilter) {
      this.filteredClasses = this.filteredClasses.filter((c) => {
        const classDayName = this.getDayName(c.day);
        return classDayName === this.dayFilter;
      });
    }

    if (this.classTypeFilter) {
      this.filteredClasses = this.filteredClasses.filter((c) => {
        return c.classType.name === this.classTypeFilter;
      });
    }

    if (this.trainerFilter) {
      this.filteredClasses = this.filteredClasses.filter((c) => {
        return c.trainer.firstName === this.trainerFilter;
      });
    }
  }
}
