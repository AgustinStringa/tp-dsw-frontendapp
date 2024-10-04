import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userSignal = signal<any>(null);

  constructor(private httpClient: HttpClient) {}

  //TO DO: ver si falta DNI u otro campo
  register(user: {
    email: string;
    password: string;
    firstName: string;
    lastname: string;
    dni: number;
  }): Observable<any> {
    return this.httpClient.post(`${environment.clientsUrl}`, {
      user,
    });
  }

  login(user: { email: string; password: string }): Observable<any> {
    return this.httpClient.post(`${environment.authUrl}`, user).pipe(
      tap((response: any) => {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        this.userSignal.set(response.data.user);
      })
    );
  }

  setSession(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getUser(): any | null {
    const user = sessionStorage.getItem('user');
    if (user !== null) {
      this.userSignal.set(JSON.parse(user));
      return JSON.parse(user);
    }
    this.userSignal.set(null);
    return null;
  }

  logout() {
    this.userSignal.set(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}
