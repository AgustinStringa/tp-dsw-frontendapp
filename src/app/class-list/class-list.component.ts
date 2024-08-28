import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ClassType } from '../core/interfaces/classType.interface.js';
import { Class } from '../core/interfaces/class.interface.js';
import { Registration } from '../core/interfaces/registration.interface.js';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css',
})
export class ClassListComponent {
  urlClass: string = '';
  classtype: ClassType[] = [];
  selectedClass: Class | null = null;
  selectedClassType: ClassType | null = null;
  urlClassType: string = 'http://localhost:3000/api/classes/types';
  urlRegistration: string = 'http://localhost:3000/api/classes/registration';

  private userId = '66ce147975ef00a40ff511f1'; // ID hardcodeado del usuario

  constructor(private http: HttpClient) {
    this.getClassTypes();
  }

  async getClassTypes() {
    try {
      this.http.get<any>(this.urlClassType).subscribe((res) => {
        this.classtype = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  selectClassType(classType: ClassType) {
    this.selectedClassType = classType;
  }

  selectClass(classItem: Class) {
    this.selectedClass = classItem;
    if (this.selectedClass) {
      console.log(`Inscrito en la clase: ${this.selectedClass.id}`);

      const registration: Registration = {
        class: this.selectedClass.id,
        client: this.userId,
      };
      this.http
        .post<Registration>(this.urlRegistration, registration)
        .subscribe(() => {
          console.log('Clase registrada correctamente.');
        });
    } else {
      console.log('No se ha seleccionado ninguna clase.');
    }
  }
}
