import IReservationSystemRepository from "@src/domain/models/TennisCourtFrames/IReservationSystemRepository";
import FirestoreDatabase from "@src/infrastructure/FirestoreDatabase";
import ReservationSystemRepository from "@src/infrastructure/TennisCourtFrames/ReservationSystemRepository";

const updateTennisCourtFrames = async (repo: IReservationSystemRepository = new ReservationSystemRepository()) => {
  const tennisCourtFrames = await repo.all(); // eslint-disable-line @typescript-eslint/no-unused-vars

  // HACK: とりあえず eslint エラーを消しただけ
  // eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/no-unused-vars
  FirestoreDatabase.runTransaction(async (t) => {
    // eslint-disable-line @typescript-eslint/no-unused-vars
    // TODO: TennisCoutFrame を更新する
    // TODO: 新たに空きが出ていれば通知する
  });
};

export default updateTennisCourtFrames;
