import { test, expect } from '@playwright/test';
import path from 'path';

const URL = process.env.BASE_URL || `file://${path.resolve(__dirname, '../public/index.html')}`;

test.describe('Tests sobre la página local', () => {

  test('login fallido con credenciales incorrectas', async ({ page }) => {
    await page.goto(URL);

    await page.getByLabel('Usuario').fill('usuario_falso');
    await page.getByLabel('Contraseña').fill('clave123');
    await page.getByRole('button', { name: 'Ingresar' }).click();

    const mensaje = page.locator('#mensaje');
    await expect(mensaje).toContainText('Usuario o contraseña incorrectos');
  });

  test('login exitoso con admin/1234', async ({ page }) => {
    await page.goto(URL);

    await page.getByLabel('Usuario').fill('admin');
    await page.getByLabel('Contraseña').fill('1234');
    await page.getByRole('button', { name: 'Ingresar' }).click();

    const mensaje = page.locator('#mensaje');
    await expect(mensaje).toContainText('¡Bienvenido, admin!');
  });

  test('campos vacíos muestra error', async ({ page }) => {
    await page.goto(URL);

    await page.getByRole('button', { name: 'Ingresar' }).click();

    const mensaje = page.locator('#mensaje');
    await expect(mensaje).toContainText('completa todos los campos');
  });

  test('contador de clics incrementa correctamente', async ({ page }) => {
    await page.goto(URL);

    const contador = page.locator('#contador');
    const boton = page.locator('#contadorBtn');

    await expect(contador).toHaveText('0');

    await boton.click();
    await expect(contador).toHaveText('1');

    await boton.click();
    await boton.click();
    await expect(contador).toHaveText('3');
  });

});