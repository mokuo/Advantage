import IReservationSystemRepository from "@src/domain/models/IReservationSystemRepository";

interface IReservationSystemRepositoriesFactory {
  buildRepositories: () => Promise<IReservationSystemRepository[]>
}

export default IReservationSystemRepositoriesFactory
