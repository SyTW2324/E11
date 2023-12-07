import puppeteer, { Browser, Page } from 'puppeteer';
import {describe, expect, test} from '@jest/globals';

describe("home", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("should go to home", async () => {
    await page.goto("http://localhost:3000");
    const url = await page.url();
    expect(url).toBe("http://localhost:3000/");
  });

  it("should go to login", async () => {
    await page.goto("http://localhost:3000");
    await page.click('a[id="login"]');
    const url = await page.url();
    expect(url).toBe("http://localhost:3000/login");
  });

  it("should go to ranking", async () => {
    await page.goto("http://localhost:3000");
    await page.click('a[id="ranking"]');
    const url = await page.url();
    expect(url).toBe("http://localhost:3000/ranking");
  });

  it("should enter a new animal", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('input[id="guess"]');
    await page.type('input[id="guess"]', "Elefante")
    await page.click('button');
    await page.waitForSelector('div[id="Elefante"]');
    const animal = await page.$eval('div[id="Elefante"]', (e) => e.textContent);
    expect(animal).toBe("ClaseMamíferoPeso(kg)6000Altura(m)3.3DietaHerbívoroHábitatSabanaMedioTerrestre");
  });
});

