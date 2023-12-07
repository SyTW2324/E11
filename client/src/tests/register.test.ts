import supertest from 'supertest';
import puppeteer, { Browser, Page } from 'puppeteer';
import {describe, expect, test} from '@jest/globals';

describe("Register", () => {

    let browser: Browser;
    let page: Page;

    beforeAll(async () => {

        const request = supertest('http://localhost:5000');
        const response = await request.get('/user/name/usertest');
        if (response.status === 200) {
            await request.delete(`/user/${response.body._id}`);
        }

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
    });
    it("should not register - user already registered", async () => {
        await page.goto("http://localhost:3000/register");
        await page.waitForSelector('input[name="username"]');
        await page.type('input[name="username"]', "fubo");
        await page.type('input[name="email"]', "fubo@gmail.com");
        await page.type('input[name="password"]', "fubo");
        await page.click('button');
        await page.waitForSelector('p[id="register-error"]');
        const error = await page.$eval('p[id="register-error"]', (e) => e.textContent);
        expect(error).toBe("Request failed with status code 409");
    });
    it("should not register - email format", async () => {
        await page.goto("http://localhost:3000/register");
        await page.waitForSelector('input[name="username"]');
        await page.type('input[name="username"]', "usertest");
        await page.type('input[name="email"]', "test");
        await page.type('input[name="password"]', "test");
        await page.click('button');
        const url = await page.url();
        expect(url).toBe("http://localhost:3000/register");
    });
    it("should not register - empty form", async () => {
        await page.goto("http://localhost:3000/register");
        await page.waitForSelector('input[name="username"]');
        await page.click('button');
        await page.waitForSelector('p[id="register-error"]');
        const error = await page.$eval('p[id="register-error"]', (e) => e.textContent);
        expect(error).toBe("Request failed with status code 422");

    });
});