import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { environment } from '../../../../environments/environment.js';
import { IClassType } from '../../../core/interfaces/class-type.interface.js';
import { IClass } from '../../../core/interfaces/class.interface.js';
import { IRegistration } from '../../../core/interfaces/registration.interface.js';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmRegistrationComponent } from '../dialog-confirm-registration/dialog-confirm-registration.component.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service.js';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule, MatExpansionModule],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css',
})
export class ClassListComponent {
  urlClass: string = '';
  classtypes: IClassType[] = [];
  selectedClass: IClass | null = null;
  selectedClassType: IClassType | null = null;
  availableClasses: IClassType[] = [];
  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private userId = '';

  constructor(private http: HttpClient, private authService: AuthService) {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.id;
      this.getRegistrations();
      this.getClassTypes();
    } else {
      console.error('No user found in session. Redirecting or handling error.');
    }
  }

  async getClassTypes() {
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

  registeredClassIds: string[] = [];

  async getRegistrations() {
    try {
      this.http
        .get<any>(`${environment.registrationUrl}/client/${this.userId}`)
        .subscribe((res) => {
          this.registeredClassIds = res.data.map(
            (registration: IRegistration) => registration.class
          );
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  async filterClases() {
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

    const dialogRef = this.dialog.open(DialogConfirmRegistrationComponent, {
      data: {
        className: `Dia: ${classItem.day} - Entrenador: ${classItem.trainer.firstName} ${classItem.trainer.lastName}`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.selectedClass) {
        const registration: IRegistration = {
          client: this.userId,
          class: this.selectedClass.id,
        };

        this.http
          .post<IRegistration>(environment.registrationUrl, registration)
          .subscribe({
            next: () => {
              console.log('Clase registrada correctamente.');
              this.openSnackBar('Registro exitoso', 'Cerrar');
            },
            error: (err) => {
              console.error(err);
              this.openSnackBar('Error al registrar la clase', 'Cerrar');
            },
          });
      } else {
        console.log('Registro cancelado.');
        this.openSnackBar('Registro cancelado.', 'Cerrar');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  getDayNameFromNumber(dayNumber: number) {
    if (dayNumber < 1 || dayNumber > 7) {
      return '';
    }
    const date = new Date(2024, 9, dayNumber);
    let dayName = format(date, 'EEEE', { locale: es });
    dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    return dayName;
  }
}
