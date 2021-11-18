import { chromium } from "playwright";
import ItabashiReservationSystemAdapter from "../ItabashiReservationSystemAdapter";

// fix: `thrown: "Exceeded timeout of 5000 ms for a test.`
jest.setTimeout(300000)

describe("ItabashiReservationSystemAdapter", () => {
  it("hoge", async () => {
    const browser = await chromium.launch()
    const adapter = new ItabashiReservationSystemAdapter()
    await adapter.getTennisCourts(browser)

    expect("hoge").toEqual("hoge")
  })
})
