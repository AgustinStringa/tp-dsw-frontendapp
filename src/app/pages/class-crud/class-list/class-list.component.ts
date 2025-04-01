import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClassDialogComponent } from '../class-dialog/class-dialog.component';
import { ClassService } from '../../../core/services/class.service';
import { ClassTypeService } from '../../../core/services/class-type.service';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { IClass } from '../../../core/interfaces/class.interface';
import { IClassType } from '../../../core/interfaces/class-type.interface';
import { IUser } from '../../../core/interfaces/user.interface';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { TrainerService } from '../../../core/services/trainer.service';

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
  dayFilter = '';
  classTypeFilter = '';
  trainerFilter = '';

  constructor(
    private classService: ClassService,
    private classTypeService: ClassTypeService,
    private trainerService: TrainerService,
    private snackbarService: SnackbarService
  ) {
    this.getClasses();
    this.getTrainers();
    this.getClassTypes();
  }

  getClasses() {
    this.classService.getAll().subscribe({
      next: (res) => {
        this.classes = res.data;
        this.applyFilter();
      },
      error: () => {
        this.classes = null;
      },
    });
  }

  getClassTypes() {
    this.classTypeService.getAll().subscribe({
      next: (res) => {
        this.classTypes = res.data;
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else
          this.snackbarService.showError(
            'Error al obtener los tipos de clases.'
          );
      },
    });
  }

  getTrainers() {
    this.trainerService.getAll().subscribe({
      next: (res) => {
        this.trainers = res.data;
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else
          this.snackbarService.showError('Error al obtener los entrenadores.');
      },
    });
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
      title: 'Eliminar Clase',
      service: this.classService,
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
