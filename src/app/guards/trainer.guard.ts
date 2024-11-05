import { CanActivateFn, Router } from '@angular/router';

export const trainerGuard: CanActivateFn = (route, state) => {
  const JSONuser = sessionStorage.getItem('user');
  const router = new Router();
  if (JSONuser != null) {
    const user: {
      dni: string;
      email: string;
      firstName: string;
      id: string;
      isClient: boolean;
      lastName: string;
      password: string;
    } = JSON.parse(JSONuser);
    if (!user.isClient) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  }
  router.navigate(['/']);
  return false;
};
