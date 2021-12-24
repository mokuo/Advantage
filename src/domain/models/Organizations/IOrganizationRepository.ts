import Organization from "./Organization"
import OrganizationName from "./OrganizationName";

interface IReservationSystemRepository {
  all: () => Promise<Organization[]>
  findByName: (name: OrganizationName) => Promise<Organization | undefined>
}

export default IReservationSystemRepository
