import Organization from "./Organizations/Organization"

interface IReservationSystemRepository {
  all: () => Promise<Organization[]>
}

export default IReservationSystemRepository
