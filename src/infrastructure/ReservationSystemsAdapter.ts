import { chromium } from "playwright";
import IReservationSystemAdapter from "./reservation-system-adapters/IReservationSystemAdapter";
import ItabashiReservationSystemAdapter from "./reservation-system-adapters/ItabashiReservationSystemAdapter";
import TennisCourt from "@src/domain/models/TennisCourt";
import IReservationSystemsAdapter from "@src/usecase/IReservationSystemsAdapter";

export class ReservationSystemScrapingError extends Error {}

class ReservationSystemsAdapter implements IReservationSystemsAdapter {
  async getTennisCourts(): Promise<TennisCourt[]> {
    const browser = await chromium.launch()
    const adapters = this.buildAdapters()
    const result: TennisCourt[] = []

    for (let i = 0; i < adapters.length; i+=1) {
      const adapter = adapters[i]
      // eslint-disable-next-line no-await-in-loop
      const tennisCourts = await adapter.getTennisCourts(browser)
      result.push(...tennisCourts)
    }

    return result
  }

  private buildAdapters(): IReservationSystemAdapter[] {
    return [
      new ItabashiReservationSystemAdapter()
    ]
  }
}

export default ReservationSystemsAdapter
