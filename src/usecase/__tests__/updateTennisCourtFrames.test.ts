import updateTennisCourtFrames from "../updateTennisCourtFrames";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";
import FirestoreDatabase from "@src/infrastructure/FirestoreDatabase";
import TennisCourtFrameRepository from "@src/infrastructure/TennisCourtFrames/TennisCourtFrameRepository";

describe("updateTennisCourtFrames()", () => {
  let repo: TennisCourtFrameRepository;
  let savedFrames: TennisCourtFrame[];

  beforeEach(() => {
    repo = new TennisCourtFrameRepository(new FirestoreDatabase());
  });

  afterEach(() => {
    // HACK: とりあえず通す
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    FirestoreDatabase.runBatch(async (t) => {
      repo = new TennisCourtFrameRepository(t);
      await Promise.all(savedFrames.map((frame) => repo.delete(frame.id!)));
    });
  });

  it("予約枠が１つ以上保存されること", async () => {
    await updateTennisCourtFrames();

    savedFrames = await repo.all();
    expect(savedFrames.length).toBeGreaterThan(0);
  });
});
