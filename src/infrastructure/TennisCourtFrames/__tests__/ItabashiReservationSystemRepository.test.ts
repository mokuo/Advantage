import { chromium } from "playwright";
import ItabashiTennisCourtFrameRepository from "../ItabashiTennisCourtFrameRepository";

// fix: `thrown: "Exceeded timeout of 5000 ms for a test.`
jest.setTimeout(30000)

describe("ItabashiReservationSystemRepository", () => {
  it("#getTennisCourts", async () => {
    const browser = await chromium.launch()
    const adapter = new ItabashiTennisCourtFrameRepository(browser)
    const tennisCourts = await adapter.all()

    expect(tennisCourts.length > 0).toBeTruthy()
  })
})
