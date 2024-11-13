import { CanActivateFn, Router } from '@angular/router';

interface user {
  dni: string;
  email: string;
  firstName: string;
  id: string;
  isClient: boolean;
  lastName: string;
  password: string;
}

export const trainerGuard: CanActivateFn = (route, state) => {
  const JSONuser = sessionStorage.getItem('user');

  if (JSONuser !== null) {
    const user: user = JSON.parse(JSONuser);
    if (!user.isClient) return true;
  }

  const router = new Router();
  router.navigate(['/']);
  return false;
};
