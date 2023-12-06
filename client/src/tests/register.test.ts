import puppeteer from 'puppeteer';
import { Browser, Page } from 'puppeteer';
import App from "../App";
describe("Register", () => {

    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    it("should register", async () => {
        await page.goto("http://localhost:3000/register");
        await page.waitForSelector('input[name="username"]');
        await page.type('input[name="username"]', "usertest");
        await page.type('input[name="email"]', "test@gmail.com");
        await page.type('input[name="password"]', "test");
        await page.click('button');
        await page.on('request', request => {
            if (request.url().includes('/register')) {
                expect(request.method()).toBe('POST');
                expect(request.postData()).toBe('{"username":"usertest","email":"test@gmail.com","password":"test"}');
            }
        });
    });

    afterAll(() => {
        page.close();
        browser.close();
    });
});