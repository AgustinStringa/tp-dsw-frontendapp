import { expect, Page, test } from '@playwright/test';

test.describe('Pruebas de tipos de clases', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:4200');

    await page.fill('#loginEmail', 'aaron@debernardo.com');
    await page.fill('#loginPassword', 'aaron');

    await page.click('#login-button');
    await page.waitForURL('http://localhost:4200/home');
  });

  test('ir a tipos de clases y crear una nueva clase', async () => {
    // Ir a tipos de clases
    await page.click('a.nav-link:text("Tipos de Clases")');
    await page.waitForURL('http://localhost:4200/class-types');

    // Crear nuevo tipo de clase
    await page.click('button:has-text("Nuevo tipo")');
    await expect(
      page.locator('h2:has-text("Nuevo Tipo de Clase")')
    ).toBeVisible();

    await page.fill('#name', 'Yoga para principiantes');
    await page.fill(
      '#description',
      'Clase de yoga básica para nuevos estudiantes'
    );

    await page.click('button:has-text("Guardar")');

    // Chequear que el nuevo tipo se muestre en la tabla
    const row = page.locator('table tr:has-text("Yoga para principiantes")');
    await expect(row).toBeVisible();
  });

  test('ir a tipos de clases y eliminar una clase', async () => {
    // Eliminar tipo de clase agregado
    const row = page.locator('table tr:has-text("Yoga para principiantes")');
    const className = await row.locator('td:first-child').textContent();

    await row.locator('[aria-label="Eliminar tipo de clase"]').click();
    await page.click('button:has-text("Confirmar")');

    // Verificar que desapareció
    await expect(
      page.locator(`table tr:has-text("${className}")`)
    ).not.toBeVisible();
  });

  test.afterAll(async () => {
    await page.close();
  });
});
