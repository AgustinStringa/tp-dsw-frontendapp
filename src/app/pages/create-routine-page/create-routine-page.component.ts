import { Component } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClientsMembershipListComponent } from '../clients-membership-list/clients-membership-list.component';
import Client from '../../core/interfaces/client.js';
@Component({
  selector: 'app-create-routine-page',
  standalone: true,
  imports: [
    CdkAccordionModule,
    HttpClientModule,
    ClientsMembershipListComponent,
  ],
  templateUrl: './create-routine-page.component.html',
  styleUrl: './create-routine-page.component.css',
})
export class CreateRoutinePageComponent {
  weeks = ['semana 1'];
  expandedIndex = 0;
  urlClientsWithMembership: string = '';
  urlExercise: string = '';
  clientsWithmembership: Client[] = [];
  exercises: Object[] = [];
  today: Date = new Date();
  constructor(private http: HttpClient) {
    this.urlClientsWithMembership =
      'http://localhost:3000/api/clients/membership-active';
    this.urlExercise = 'http://localhost:3000/api/routines/exercises';
    this.getClientsWithMembership();
  }
  async getClientsWithMembership() {
    try {
      this.http
        .get<any>(this.urlClientsWithMembership)
        .subscribe((res: any) => {
          Array.from(res.data).forEach((u: any) => {
            this.clientsWithmembership.push(
              new Client(
                u.id,
                u.lastName,
                u.firstName,
                u.dni,
                u.email,
                u.memberships
              )
            );
          });
        });
    } catch (error: any) {
      console.log(error);
    }
  }
  async getExercises() {
    try {
      this.http.get<any>(this.urlExercise).subscribe((res: any) => {
        this.exercises = res.data;
        console.log(this.exercises);
      });
    } catch (error: any) {
      console.log(error);
    }
  }
  addweek() {
    this.weeks.push('semana ' + (this.weeks.length + 1));
  }
}
