import { AuthService } from '../../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IClass } from '../../../core/interfaces/class.interface';
import { IClassType } from '../../../core/interfaces/class-type.interface';
import { IRegistration } from '../../../core/interfaces/registration.interface';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { ConfirmRegistrationDialogComponent } from '../confirm-registration-dialog/confirm-registration-dialog.component';

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
    private http: HttpClient,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {
    const user = this.authService.getUser();
    if (user) {
      console.log(user);
      this.userId = user.id;
      this.getRegistrations();
      this.getClassTypes();
    } else {
      console.error('No user found in session. Redirecting or handling error.');
    }
  }

  getClassTypes() {
    try {
      this.http
        .get<any>(`${environment.classTypesUrl}`)

        .subscribe((res) => {
          this.classtypes = res.data;
          this.filterClases();
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  getRegistrations() {
    try {
      this.http
        .get<any>(`${environment.registrationUrl}/client/${this.userId}`)
        .subscribe((res) => {
          this.registeredClassIds = res.data.map(
            (registration: any) => registration.classId
          );
        });
    } catch (error: any) {
      console.log(error);
    }
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

    console.log('Clases disponibles:', this.availableClasses);
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
      if (result && this.selectedClass) {
        const registration: any = {
          clientId: this.userId,
          classId: this.selectedClass.id,
        };

        this.http
          .post<IRegistration>(environment.registrationUrl, registration)
          .subscribe({
            next: () => {
              this.snackbarService.showSuccess('Inscripción realizada');
              this.getRegistrations();
              this.getClassTypes();
            },
            error: (err) => {
              console.log(err);
              this.snackbarService.showError(
                'Error al inscribirse en la clase'
              );
            },
          });
      } else {
        this.snackbarService.showError('Inscripción cancelada');
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
