import puppeteer, {Browser, Page} from "puppeteer";
import {describe, expect, test} from "@jest/globals";

describe("Login", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("should login", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]', "fubo@gmail.com");
    await page.type('input[name="password"]', "fubo");
    await page.click('button[id="login-button"]');
  });
  it("should not login - wrong password", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]', "fubo@gmail.com");
    await page.type('input[name="password"]', "fubo2");
    await page.click('button[id="login-button"]');
    await page.waitForSelector('p[id="login-error"]');
    const error = await page.$eval('p[id="login-error"]', (e) => e.textContent);
    expect(error).toBe("Contraseña incorrecta");
  });
  it("should not login - wrong email", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]', "notauser@gmail.com");
    await page.type('input[name="password"]', "fubo");
    await page.click('button[id="login-button"]');
    await page.waitForSelector('p[id="login-error"]');
    const error = await page.$eval('p[id="login-error"]', (e) => e.textContent);
    expect(error).toBe("Usuario no encontrado");
  });
  it("should not login - empty form", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector('input[name="email"]');
    await page.click('button[id="login-button"]');
    await page.waitForSelector('p[id="login-error"]');
    const error = await page.$eval('p[id="login-error"]', (e) => e.textContent);
    expect(error).toBe("Formato de correo electrónico inválido");
  });
  it("should not login - email format", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]', "test");
    await page.type('input[name="password"]', "fubo");
    await page.click('button[id="login-button"]');
    const url = await page.url();
    expect(url).toBe("http://localhost:3000/login");
  });
});
