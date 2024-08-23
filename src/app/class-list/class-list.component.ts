import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ClassType } from '../core/interfaces/classType.interface.js';
import { User } from '../core/interfaces/user.interface.js';

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
  selectedClassType: ClassType | null = null;
  urlClassType: string = 'http://localhost:3000/api/classes/types';
  urlTrainer: string = 'http://localhost:3000/api/trainers'; // URL para obtener trainers
  trainers: { [id: string]: User } = {}; // Mapa para almacenar trainers por ID

  constructor(private http: HttpClient) {
    this.getClassTypes();
  }
  /*
  async loadTrainers() {
    try {
      const response = await this.http.get<any>(this.urlTrainer).toPromise();
      response.data.forEach((trainer: User) => {
        this.trainers[trainer.id] = trainer;
      });
    } catch (error) {
      console.error('Error loading trainers:', error);
    }
  }

  trackByClassId(index: number, item: any): string {
    return item.id;
  }
  async getTrainerName(trainerId: string): Promise<string> {
    try {
      const response = await this.trainers[trainerId]?.firstName;
      return response;
    } catch (error) {
      return 'Unknown Trainer';
    }
  }
*/
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

  getClassTypeInfo() {
    if (this.selectedClassType) {
      console.log('Selected Class Type:', this.selectedClassType);
      // TO DO
    } else {
      console.log('No Class Type selected');
    }
  }
}
