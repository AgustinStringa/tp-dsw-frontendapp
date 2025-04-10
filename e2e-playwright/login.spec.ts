import { expect, test } from '@playwright/test';

test('la página carga correctamente y muestra el título', async ({ page }) => {
  await page.goto('http://localhost:4200');

  const titulo = await page.textContent('h1');
  expect(titulo).toBe('COMIENZA HOY A CAMBIAR TU VIDA Y TU CUERPO.');
});

test('debe iniciar sesión correctamente con credenciales válidas', async ({
  page,
}) => {
  await page.goto('http://localhost:4200');

  await page.fill('#loginEmail', 'aaron@debernardo.com');
  await page.fill('#loginPassword', 'aaron');

  await page.click('#login-button');

  await page.waitForURL('http://localhost:4200/home');

  expect(page.url()).toBe('http://localhost:4200/home');
});
