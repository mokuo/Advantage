import IReservationSystemRepository from "@src/domain/models/TennisCourtFrames/IReservationSystemRepository";
import TennisCourtFramesDiffService from "@src/domain/services/TennisCourtFrames/TennisCourtFramesDiffService";
import FirestoreDatabase from "@src/infrastructure/FirestoreDatabase";
import ReservationSystemRepository from "@src/infrastructure/TennisCourtFrames/ReservationSystemRepository";
import TennisCourtFrameRepository from "@src/infrastructure/TennisCourtFrames/TennisCourtFrameRepository";

const updateTennisCourtFrames = async (reservationSystem: IReservationSystemRepository = new ReservationSystemRepository()) => {
  const tennisCourtFrames = await reservationSystem.all();

  FirestoreDatabase.runTransaction(async (t) => {
    // TODO: TennisCoutFrame を更新する
    const repo = new TennisCourtFrameRepository(t)
    const oldTennisCourtFrames = repo.
    const service = new TennisCourtFramesDiffService()
    const hoge = service.diff()

    // TODO: 新たに空きが出ていれば通知する
  });
};

export default updateTennisCourtFrames;
