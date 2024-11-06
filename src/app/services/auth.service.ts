import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.js';
import { SnackbarService } from './snackbar.service.js';

interface IUserSession {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  isClient: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userSignal = signal<IUserSession | null>(null);

  constructor(
    private httpClient: HttpClient,
    private snackbarService: SnackbarService
  ) {}

  register(user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dni: number;
  }): Observable<any> {
    return this.httpClient
      .post(`${environment.clientsUrl}`, {
        ...user,
      })
      .pipe(
        tap((response: any) => {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem(
            'user',
            JSON.stringify({
              ...response.data.user,
            })
          );
          this.userSignal.set({
            ...response.data.user,
          });
        })
      );
  }

  login(user: { email: string; password: string }): Observable<any> {
    return this.httpClient.post(`${environment.authUrl}`, user).pipe(
      tap((response: any) => {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem(
          'user',
          JSON.stringify({
            ...response.data.user,
          })
        );
        this.userSignal.set({
          ...response.data.user,
        });
      })
    );
  }

  setSession(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getUser(): IUserSession | null {
    const user = sessionStorage.getItem('user');

    if (user !== null) {
      const parsed = JSON.parse(user);
      this.userSignal.set(parsed);
      return parsed;
    }

    this.userSignal.set(null);
    return null;
  }

  async logout(): Promise<boolean> {
    try {
      await firstValueFrom(
        this.httpClient.post(`${environment.authUrl}/logout/`, {})
      );

      this.userSignal.set(null);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      return true;
    } catch (error) {
      this.snackbarService.showError('No se pudo cerrar la sesión');
      return false;
    }
  }
}
