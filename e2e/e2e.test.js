import { fork } from "child_process";
import puppetteer from "puppeteer";

jest.setTimeout(30000); // default puppeteer timeout

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("should add do something", async () => {
    await page.goto(baseUrl);
    const form = await page.$(".validate");
    const input = await form.$(".validate__input");
    await input.type("5555555555554444");
    const submit = await form.$(".validate__button");
    submit.click();
    await page.waitForSelector(".visa.cdisabled");
  });
});
