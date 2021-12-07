import IReservationSystemRepositoriesFactory from "./IReservationSystemRepositoriesFactory";
import ReservationSystemRepositoriesFactory from "./ReservationSystemRepositoriesFactory";
import Collection from "@src/domain/models/Collection";
import CollectionId from "@src/domain/models/CollectionId";
import CollectionRepository from "@src/infrastructure/CollectionRepository";
import FirestoreDatabase from "@src/infrastructure/FirestoreDatabase";

const updateReservableTennisCourts = async (
  factory: IReservationSystemRepositoriesFactory = new ReservationSystemRepositoriesFactory(),
  db: FirestoreDatabase = new FirestoreDatabase() // TODO: 抽象化
) => {
  const systemRepos = await factory.buildRepositories()
  const tennisCourts = (
    await Promise.all(
      systemRepos.map(async (repo) => repo.getTennisCourts())
    )
  ).flat()

  const collection = new Collection(
    CollectionId.build(),
    tennisCourts,
    new Date()
  )

  // HACK: とりあえず eslint エラーを消しただけ
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  db.runTransaction(async (t) => {
    // TODO: 前回との差分を見て、新たに空きが出ていれば通知する
    const repo = new CollectionRepository(t)
    await repo.save(collection)
  })
};

export default updateReservableTennisCourts;
