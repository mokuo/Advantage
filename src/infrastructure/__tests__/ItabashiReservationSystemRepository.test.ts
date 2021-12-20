import { chromium } from "playwright";
import ItabashiReservationSystemRepository from "../ItabashiReservationSystemRepository";

// fix: `thrown: "Exceeded timeout of 5000 ms for a test.`
jest.setTimeout(30000)

describe("ItabashiReservationSystemRepository", () => {
  it("#getTennisCourts", async () => {
    const browser = await chromium.launch()
    const adapter = new ItabashiReservationSystemRepository(browser)
    const tennisCourts = await adapter.getTennisCourts()

    expect(tennisCourts.length > 0).toBeTruthy()
  })
})
