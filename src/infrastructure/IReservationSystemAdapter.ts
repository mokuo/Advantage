import TennisCourt from "@src/domain/models/TennisCourt"
import { Browser } from "playwright";

interface IReservationSystemAdapter {
  getTennisCourts: (browser: Browser) => Promise<TennisCourt[]>
}

export default IReservationSystemAdapter
