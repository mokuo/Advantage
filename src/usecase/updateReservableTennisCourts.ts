import IReservationSystemRepositoriesFactory from "./IReservationSystemRepositoriesFactory";
import ReservationSystemRepositoriesFactory from "./ReservationSystemRepositoriesFactory";
import Collection from "@src/domain/models/Collection";

const updateReservableTennisCourts = async (factory: IReservationSystemRepositoriesFactory = new ReservationSystemRepositoriesFactory()) => {
  const repos = await factory.buildRepositories()
  const tennisCourts = (
    await Promise.all(
      repos.map(async (repo) => repo.getTennisCourts())
    )
  ).flat()

  const collection = new Collection(tennisCourts, new Date())
  // TODO: DB への書き込み
  // TODO: 前回との差分を見て、新たに空きが出ていれば通知する
};

export default updateReservableTennisCourts;
