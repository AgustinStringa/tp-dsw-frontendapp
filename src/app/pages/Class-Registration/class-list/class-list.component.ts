import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.js';
import { IClassType } from '../../../core/interfaces/class-type.interface.js';
import { IClass } from '../../../core/interfaces/class.interface.js';
import { IRegistration } from '../../../core/interfaces/registration.interface.js';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmRegistrationComponent } from '../dialog-confirm-registration/dialog-confirm-registration.component.js';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private userId = '66e9b19b100c4d9c3024fc97'; // ID hardcodeado del usuario

  constructor(private http: HttpClient) {
    this.getClassTypes();
  }

  async getClassTypes() {
    try {
      this.http.get<any>(environment.classTypesUrl).subscribe((res) => {
        this.classtypes = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
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
}
