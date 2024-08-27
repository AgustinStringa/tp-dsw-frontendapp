import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ClassType } from '../core/interfaces/classType.interface.js';
import { User } from '../core/interfaces/user.interface.js';
import { MatDialog } from '@angular/material/dialog/index.js';
import { Class } from '../core/interfaces/class.interface.js';

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
      // TO DO: Logica para inscribirse a una clase
    } else {
      console.log('No se ha seleccionado ninguna clase.');
    }
  }
}
