import TennisCourtFrame from "./TennisCourtFrame";
import TennisCourtFrameId from "./TennisCourtFrameId";

interface IReservationSystemRepository {
  find: (id: TennisCourtFrameId) => Promise<TennisCourtFrame | undefined>;
  save: (frame: TennisCourtFrame) => Promise<void>;
  all: () => Promise<TennisCourtFrame[]>;
}

export default IReservationSystemRepository;
