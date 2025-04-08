import { Component, inject } from '@angular/core';
import {
  IRegistrationCreate,
  RegistrationService,
} from '../../../core/services/registration.service';
import { AuthService } from '../../../core/services/auth.service';
import { ClassTypeService } from '../../../core/services/class-type.service';
import { ConfirmRegistrationDialogComponent } from '../confirm-registration-dialog/confirm-registration-dialog.component';
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
import { forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IClass } from '../../../core/interfaces/class.interface';
import { IClassType } from '../../../core/interfaces/class-type.interface';
import { IRegistration } from '../../../core/interfaces/registration.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MembershipService } from '../../../core/services/membership.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css',
})
export class ClassListComponent {
  hasActiveMembership = false;
  classTypes: IClassType[] = [];
  availableClasses: IClassType[] = [];
  clientRegistrations: IRegistration[] = [];

  selectedClass: IClass | null = null;
  selectedClassType: IClassType | null = null;

  private dialog = inject(MatDialog);
  private userId = '';

  constructor(
    private authService: AuthService,
    private classTypeService: ClassTypeService,
    private membershipService: MembershipService,
    private registrationService: RegistrationService,
    private snackbarService: SnackbarService
  ) {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.id;
      this.getActiveMembership();
    }
  }

  getActiveMembership() {
    this.membershipService.getActiveByClient(this.userId).subscribe({
      next: () => {
        this.hasActiveMembership = true;
        this.getClassTypesAndRegistrations();
      },
      error: (err) => {
        if (err.status === 404) this.hasActiveMembership = false;
      },
    });
  }

  getClassTypesAndRegistrations() {
    forkJoin({
      classTypes: this.classTypeService.getAll(),
      registrations: this.registrationService.getByClient(this.userId),
    }).subscribe({
      next: (res) => {
        this.classTypes = res.classTypes.data;
        this.clientRegistrations = res.registrations.data;
        this.filterClasses();
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else
          this.snackbarService.showError(
            'Error al obtener las clases e inscripciones.'
          );
      },
    });
  }

  filterClasses() {
    this.availableClasses = this.classTypes
      .map((classType) => {
        classType.classes = classType.classes.filter((classItem) => {
          return !this.clientRegistrations.some(
            (reg) => reg.class.id === classItem.id
          );
        });
        return classType;
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
        this.getClassTypesAndRegistrations();
      },
      error: (err) => {
        if (err.error.isUserFriendly)
          this.snackbarService.showError(err.error.message);
        else
          this.snackbarService.showError('Error al inscribirse en la clase.');
      },
    });
  }

  cancelRegistration(registration: IRegistration) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id: registration.id,
        title: 'Eliminar Inscripción',
        service: this.registrationService,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'deleted') {
        this.getClassTypesAndRegistrations();
      } else {
        this.snackbarService.showError('No se eliminó la inscripción.');
      }
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
