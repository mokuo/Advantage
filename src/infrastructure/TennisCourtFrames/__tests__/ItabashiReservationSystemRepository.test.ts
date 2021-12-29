import { chromium, Browser } from "playwright";
import ItabashiReservationSystemRepository from "../ItabashiReservationSystemRepository";

// fix: `thrown: "Exceeded timeout of 5000 ms for a test.`
jest.setTimeout(60000);

describe("ItabashiReservationSystemRepository", () => {
  // ref: https://playwright.tech/blog/using-jest-with-playwright
  let browser: Browser;
  beforeAll(async () => {
    browser = await chromium.launch();
  });
  afterAll(async () => {
    await browser.close();
  });

  it("#getTennisCourts", async () => {
    const repo = new ItabashiReservationSystemRepository(browser);
    const tennisCourts = await repo.all();
    await browser.close();

    expect(tennisCourts.length > 0).toBeTruthy();
  });
});
