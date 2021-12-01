import { chromium } from "playwright";
import ItabashiReservationSystemAdapter from "../ItabashiReservationSystemAdapter";

// fix: `thrown: "Exceeded timeout of 5000 ms for a test.`
jest.setTimeout(30000)

describe("ItabashiReservationSystemAdapter", () => {
  it("hoge", async () => {
    const browser = await chromium.launch()
    const adapter = new ItabashiReservationSystemAdapter()
    const tennisCourts = await adapter.getTennisCourts(browser)

    expect(tennisCourts.length > 0).toBeTruthy()
  })
})
