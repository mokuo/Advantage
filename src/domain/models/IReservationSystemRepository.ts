import TennisCourt from "./TennisCourt"

interface IReservationSystemRepository {
  getTennisCourts: () => Promise<TennisCourt[]>
}

export default IReservationSystemRepository
