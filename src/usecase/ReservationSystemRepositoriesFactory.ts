import { chromium } from "playwright";
import IReservationSystemRepositoriesFactory from "./IReservationSystemRepositoriesFactory";
import IReservationSystemRepository from "@src/domain/models/IReservationSystemRepository";
import ItabashiReservationSystemRepository from "@src/infrastructure/ItabashiReservationSystemRepository";

class ReservationSystemRepositoriesFactory implements IReservationSystemRepositoriesFactory {
  async buildRepositories(): Promise<IReservationSystemRepository[]> {
    const browser = await chromium.launch()

    return [
      new ItabashiReservationSystemRepository(browser)
    ]
  }
}

export default ReservationSystemRepositoriesFactory
