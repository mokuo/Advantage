import updateTennisCourtFrames from "../updateTennisCourtFrames";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";
import FirestoreDatabase from "@src/infrastructure/FirestoreDatabase";
import TennisCourtFrameRepository from "@src/infrastructure/TennisCourtFrames/TennisCourtFrameRepository";

// fix: `thrown: "Exceeded timeout of 5000 ms for a test.`
jest.setTimeout(30000);

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
    await updateTennisCourtFrames();

    savedFrames = await repo.all();
    expect(savedFrames.length).toBeGreaterThan(0);
  });
});
