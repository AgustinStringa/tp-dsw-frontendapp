import { firstValueFrom, Observable, tap } from 'rxjs';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SnackbarService } from './snackbar.service';

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
    return this.httpClient.post(environment.authUrl, user).pipe(
      tap((response: any) => {
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

      this.clearUserSession();
      return true;
    } catch (error) {
      this.snackbarService.showError('No se pudo cerrar la sesión');
      return false;
    }
  }

  clearUserSession(): void {
    this.userSignal.set(null);
    sessionStorage.removeItem('user');
  }

  async extendSession(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post(`${environment.authUrl}/refresh/`, {}).subscribe({
        next: (res: any) => {
          sessionStorage.setItem(
            'user',
            JSON.stringify({
              ...res.data.user,
            })
          );

          this.userSignal.set({
            ...res.data.user,
          });

          resolve(true);
        },
        error: () => {
          resolve(false);
        },
      });
    });
  }
}
