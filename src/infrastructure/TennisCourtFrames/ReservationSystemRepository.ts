import { chromium } from "playwright";
import ItabashiReservationSystemRepository from "./ItabashiReservationSystemRepository";
import IReservationSystemRepository from "@src/domain/models/TennisCourtFrames/IReservationSystemRepository";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";

class ReservationSystemRepository implements IReservationSystemRepository {
  async all(): Promise<TennisCourtFrame[]> {
    const browser = await chromium.launch();
    const repos: IReservationSystemRepository[] = [new ItabashiReservationSystemRepository(browser)];

    const tennisCourtFrames = (await Promise.all(repos.map(async (repo) => repo.all()))).flat();

    return tennisCourtFrames;
  }
}

export default ReservationSystemRepository;
