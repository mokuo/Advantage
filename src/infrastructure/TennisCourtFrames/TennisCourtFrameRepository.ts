import { chromium } from "playwright";
import ItabashiTennisCourtFrameRepository from "./ItabashiTennisCourtFrameRepository";
import ITennisCourtFrameRepository from "@src/domain/models/TennisCourtFrames/ITennisCourtFrameRepository";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";

class TennisCourtFrameRepository implements ITennisCourtFrameRepository {
  async all(): Promise<TennisCourtFrame[]> {
    const browser = await chromium.launch()
    const repos: ITennisCourtFrameRepository[] = [
      new ItabashiTennisCourtFrameRepository(browser)
    ]

    const tennisCourtFrames = (
      await Promise.all(
        repos.map(async (repo) => repo.all())
      )
    ).flat()

    return tennisCourtFrames
  }
}

export default TennisCourtFrameRepository
