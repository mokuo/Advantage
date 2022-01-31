import ILineAdapter from "./ILineAdapter";
import MessageBuilder from "./MessageBuilder";
import IReservationSystemRepository from "#src/domain/models/TennisCourtFrames/IReservationSystemRepository";
import TennisCourtFramesDiffService from "#src/domain/services/TennisCourtFrames/TennisCourtFramesDiffService";
import FirestoreDatabase from "#src/infrastructure/FirestoreDatabase";
import LineAdapter from "#src/infrastructure/LineAdapter";
import OrganizationRepository from "#src/infrastructure/Organizations/OrganizationRepository";
import ReservationSystemRepository from "#src/infrastructure/TennisCourtFrames/ReservationSystemRepository";
import TennisCourtFrameRepository from "#src/infrastructure/TennisCourtFrames/TennisCourtFrameRepository";

class UpdateTennisCourtFramesUsecase {
  private reservationSystemRepo: IReservationSystemRepository;

  private lineAdapter: ILineAdapter;

  constructor(
    reservationSystemRepo: IReservationSystemRepository = new ReservationSystemRepository(),
    lineAdapter: ILineAdapter = new LineAdapter()
  ) {
    this.reservationSystemRepo = reservationSystemRepo;
    this.lineAdapter = lineAdapter;
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

      const orgRepo = new OrganizationRepository();
      const organizations = await orgRepo.all();
      const message = new MessageBuilder().buildMessage(organizations, changed.concat(added));
      await this.lineAdapter.sendMessage(message);
    });
  }
}

export default UpdateTennisCourtFramesUsecase;
