import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ClassType } from '../core/interfaces/classType.interface.js';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [NgFor, NgIf, HttpClientModule],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css',
})
export class ClassListComponent {
  url: string = '';
  classtype: ClassType[] = [];

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/api/classes/types';
  }

  async getClassTypes() {
    try {
      this.http.get<any>(this.url).subscribe((res) => {
        this.classtype = res.data;
      });
    } catch (error: any) {
      console.log(error);
    }
  }
}
