import { Page } from "playwright";

class BaseReservationSystemAdapter {
  protected async waitAndClick(page: Page, selector: string) {
    await page.waitForSelector(selector)
    await page.click(selector)
  }
}

export default BaseReservationSystemAdapter
