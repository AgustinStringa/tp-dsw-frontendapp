import { Component, inject } from '@angular/core';
import {
  IRegistrationCreate,
  RegistrationService,
} from '../../../core/services/registration.service';
import { AuthService } from '../../../core/services/auth.service';
import { ClassTypeService } from '../../../core/services/class-type.service';
import { ConfirmRegistrationDialogComponent } from '../confirm-registration-dialog/confirm-registration-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { IClass } from '../../../core/interfaces/class.interface';
import { IClassType } from '../../../core/interfaces/class-type.interface';
import { IRegistration } from '../../../core/interfaces/registration.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgIf } from '@angular/common';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [MatExpansionModule, NgIf],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css',
})
export class ClassListComponent {
  urlClass = '';
  classtypes: IClassType[] = [];
  selectedClass: IClass | null = null;
  selectedClassType: IClassType | null = null;
  availableClasses: IClassType[] = [];
  registeredClassIds: string[] = [];

  private dialog = inject(MatDialog);
  private userId = '';

  constructor(
    private authService: AuthService,
    private classTypeService: ClassTypeService,
    private registrationService: RegistrationService,
    private snackbarService: SnackbarService
  ) {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.id;
      this.getRegistrations();
      this.getClassTypes();
    } else {
      //TODO cambiar
      console.error('No user found in session. Redirecting or handling error.');
    }
  }

  getClassTypes() {
    this.classTypeService.getAll().subscribe({
      next: (res) => {
        this.classtypes = res.data;
        this.filterClases();
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

  getRegistrations() {
    this.registrationService.getByClient(this.userId).subscribe({
      next: (res) => {
        this.registeredClassIds = res.data.map(
          (registration: IRegistration) => registration.classId
        );
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else
          this.snackbarService.showError('Error al obtener las inscripciones.');
      },
    });
  }

  filterClases() {
    this.availableClasses = this.classtypes ? [...this.classtypes] : [];

    const registeredClassIdsSet = new Set(this.registeredClassIds);
    this.availableClasses = this.availableClasses
      .map((classType) => {
        const filteredClasses = classType.classes.filter(
          (cls) => cls.active === true && !registeredClassIdsSet.has(cls.id)
        );
        return { ...classType, classes: filteredClasses };
      })
      .filter((classType) => classType.classes.length > 0);
  }

  selectClassType(classType: IClassType) {
    this.selectedClassType = classType;
  }

  selectClass(classItem: IClass) {
    this.selectedClass = classItem;

    const dialogRef = this.dialog.open(ConfirmRegistrationDialogComponent, {
      data: {
        className: classItem.classType.name, //TODO enviar nombre de la clase
        trainer: classItem.trainer.firstName + ' ' + classItem.trainer.lastName,
        day: this.getDayNameFromNumber(classItem.day),
        startTime: classItem.startTime,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true && this.selectedClass) {
        this.registerToClass();
      } else {
        this.snackbarService.showError('Inscripción cancelada.');
      }
    });
  }

  registerToClass() {
    const registration: IRegistrationCreate = {
      clientId: this.userId,
      classId: this.selectedClass!.id,
    };

    this.registrationService.create(registration).subscribe({
      next: () => {
        this.snackbarService.showSuccess('Inscripción realizada.');
        this.getRegistrations();
        this.getClassTypes();
      },
      error: (err) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else
          this.snackbarService.showError('Error al inscribirse en la clase.');
      },
    });
  }

  getDayNameFromNumber(dayNumber: number) {
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
}
