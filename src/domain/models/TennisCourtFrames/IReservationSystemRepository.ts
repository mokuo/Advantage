import TennisCourtFrame from "./TennisCourtFrame";

interface IReservationSystemRepository {
  all: () => Promise<TennisCourtFrame[]>;
}

export default IReservationSystemRepository;
