import { CanActivateFn, Router } from '@angular/router';

//quiza se podria agregar la validacion de token en cada una de las guardas (trainer, client)
export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token');
  const router = new Router();

  if (token) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
