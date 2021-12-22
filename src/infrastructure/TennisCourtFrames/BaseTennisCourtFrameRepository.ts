import { Page, Browser } from "playwright";

class BaseReservationSystemRepository {
  protected browser: Browser

  constructor(browser: Browser) {
    this.browser = browser
  }

  protected async waitAndClick(page: Page, selector: string) {
    await page.waitForSelector(selector)
    await page.click(selector)
  }
}

export default BaseReservationSystemRepository
