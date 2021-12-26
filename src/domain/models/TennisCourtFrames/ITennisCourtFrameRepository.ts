import TennisCourtFrame from "./TennisCourtFrame";

interface ITennisCourtFrameRepository {
  all: () => Promise<TennisCourtFrame[]>;
}

export default ITennisCourtFrameRepository;
