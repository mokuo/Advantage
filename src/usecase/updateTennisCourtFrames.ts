import IReservationSystemRepository from "@src/domain/models/TennisCourtFrames/IReservationSystemRepository";
import TennisCourtFramesDiffService from "@src/domain/services/TennisCourtFrames/TennisCourtFramesDiffService";
import FirestoreDatabase from "@src/infrastructure/FirestoreDatabase";
import ReservationSystemRepository from "@src/infrastructure/TennisCourtFrames/ReservationSystemRepository";
import TennisCourtFrameRepository from "@src/infrastructure/TennisCourtFrames/TennisCourtFrameRepository";

const updateTennisCourtFrames = async (
  reservationSystem: IReservationSystemRepository = new ReservationSystemRepository()
) => {
  const newTennisCourtFrames = await reservationSystem.all();

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  await FirestoreDatabase.runTransaction(async (t) => {
    const repo = new TennisCourtFrameRepository(t);
    const oldTennisCourtFrames = await repo.all();
    const service = new TennisCourtFramesDiffService();
    const { deleted, changed, added } = service.diff(oldTennisCourtFrames, newTennisCourtFrames);

    await Promise.all(deleted.map((frame) => repo.delete(frame.id!))); // deleted は既に id が付与されている想定
    await Promise.all(changed.map((frame) => repo.save(frame)));
    await Promise.all(
      added.map((frame) => {
        frame.buildId();
        return repo.save(frame);
      })
    );
  });

  // TODO: 新たに空きが出ていれば通知する
};

export default updateTennisCourtFrames;
