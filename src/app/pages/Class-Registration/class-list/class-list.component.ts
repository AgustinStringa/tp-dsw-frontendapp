import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.js';
import { IClassType } from '../../../core/interfaces/class-type.interface.js';
import { IClass } from '../../../core/interfaces/class.interface.js';
import { IRegistration } from '../../../core/interfaces/registration.interface.js';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css',
})
export class ClassListComponent {
  urlClass: string = '';
  classtypes: IClassType[] = [];
  selectedClass: IClass | null = null;
  selectedClassType: IClassType | null = null;
  urlClassType: string = environment.ClassType;
  urlRegistration: string = environment.Registration;

  private userId = '66ce147975ef00a40ff511f1'; // ID hardcodeado del usuario

  constructor(private http: HttpClient) {
    this.getClassTypes();
  }

  async getClassTypes() {
    try {
      this.http.get<any>(this.urlClassType).subscribe((res) => {
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
    if (this.selectedClass) {
      console.log(`Inscrito en la clase: ${this.selectedClass.id}`);

      const registration: IRegistration = {
        class: this.selectedClass,
        client: this.userId,
      };
      this.http
        .post<IRegistration>(this.urlRegistration, registration)
        .subscribe(() => {
          console.log('Clase registrada correctamente.');
        });
    } else {
      console.log('No se ha seleccionado ninguna clase.');
    }
  }
}
