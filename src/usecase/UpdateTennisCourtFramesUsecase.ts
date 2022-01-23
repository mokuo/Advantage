import IReservationSystemRepository from "@src/domain/models/TennisCourtFrames/IReservationSystemRepository";
import TennisCourtFramesDiffService from "@src/domain/services/TennisCourtFrames/TennisCourtFramesDiffService";
import FirestoreDatabase from "@src/infrastructure/FirestoreDatabase";
import ReservationSystemRepository from "@src/infrastructure/TennisCourtFrames/ReservationSystemRepository";
import TennisCourtFrameRepository from "@src/infrastructure/TennisCourtFrames/TennisCourtFrameRepository";

class UpdateTennisCourtFramesUsecase {
  private reservationSystemRepo: IReservationSystemRepository;

  constructor(reservationSystemRepo: IReservationSystemRepository = new ReservationSystemRepository()) {
    this.reservationSystemRepo = reservationSystemRepo;
  }

  async update() {
    const newTennisCourtFrames = await this.reservationSystemRepo.all();

    await FirestoreDatabase.runTransaction(async (t) => {
      const repo = new TennisCourtFrameRepository(t);
      const oldTennisCourtFrames = await repo.all();
      const service = new TennisCourtFramesDiffService();
      const { deleted, changed, added } = service.diff(oldTennisCourtFrames, newTennisCourtFrames);

      await Promise.all(deleted.map((frame) => repo.delete(frame.id)));
      await Promise.all(changed.map((frame) => repo.save(frame)));
      await Promise.all(added.map((frame) => repo.save(frame)));
    });

    // TODO: 新たに空きが出ていれば通知する
  }
}

export default UpdateTennisCourtFramesUsecase;
