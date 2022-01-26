import ILineAdapter from "../ILineAdapter";
import UpdateTennisCourtFramesUsecase from "../UpdateTennisCourtFramesUsecase";
import FacilityId from "@src/domain/models/Organizations/FacilityId";
import IReservationSystemRepository from "@src/domain/models/TennisCourtFrames/IReservationSystemRepository";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";
import TennisCourtFrameId from "@src/domain/models/TennisCourtFrames/TennisCourtFrameId";
import TennisCourtFrameStatus from "@src/domain/models/TennisCourtFrames/TennisCourtFrameStatus";
import TennisCourtName from "@src/domain/models/TennisCourtFrames/TennisCourtName";
import UsageTime from "@src/domain/models/TennisCourtFrames/UsageTime";
import FirestoreDatabase from "@src/infrastructure/FirestoreDatabase";
import { ORGANIZATIONS } from "@src/infrastructure/Organizations/OrganizationRepository";
import ReservationSystemRepository from "@src/infrastructure/TennisCourtFrames/ReservationSystemRepository";
import TennisCourtFrameRepository from "@src/infrastructure/TennisCourtFrames/TennisCourtFrameRepository";

// fix: `thrown: "Exceeded timeout of 5000 ms for a test.`
jest.setTimeout(30000);

class MockReservationSystemRepository implements IReservationSystemRepository {
  async all() {
    return [
      new TennisCourtFrame(
        TennisCourtFrameId.build(),
        ORGANIZATIONS[0].facilities[0].id,
        new TennisCourtName("テニスコート1"),
        new UsageTime(new Date(2022, 1 - 1, 26, 9), new Date(2022, 1 - 1, 26, 11)),
        new TennisCourtFrameStatus("available")
      ),
    ];
  }
}

class MockLineAdapter implements ILineAdapter {
  private message: string = "";

  async sendMessage(text: string): Promise<void> {
    this.message = text;
  }

  getMessage(): string {
    return this.message;
  }
}

describe("updateTennisCourtFrames()", () => {
  let repo: TennisCourtFrameRepository;
  let savedFrames: TennisCourtFrame[] = [];

  beforeEach(() => {
    repo = new TennisCourtFrameRepository(new FirestoreDatabase());
  });

  afterEach(async () => {
    await FirestoreDatabase.runBatch(async (t) => {
      repo = new TennisCourtFrameRepository(t);
      await Promise.all(savedFrames.map((frame) => repo.delete(frame.id)));
    });
  });

  it("予約枠が１つ以上保存されること", async () => {
    const usecase = new UpdateTennisCourtFramesUsecase(new ReservationSystemRepository(), new MockLineAdapter());
    await usecase.update();

    savedFrames = await repo.all();
    expect(savedFrames.length).toBeGreaterThan(0);
  });

  it("LINE 通知されること", async () => {
    const mockLineAdapter = new MockLineAdapter();
    const usecase = new UpdateTennisCourtFramesUsecase(new MockReservationSystemRepository(), mockLineAdapter);
    await usecase.update();

    const expectedMessage = `# 板橋区 東板橋庭球場
- テニスコート1 2022-01-26 09:00~11:00
`;

    expect(mockLineAdapter.getMessage()).toEqual(expectedMessage);
  });
});
