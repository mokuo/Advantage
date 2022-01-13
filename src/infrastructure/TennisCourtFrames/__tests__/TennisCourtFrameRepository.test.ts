import TennisCourtFrameRepository from "../TennisCourtFrameRepository";
import FacilityId from "@src/domain/models/Organizations/FacilityId";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";
import TennisCourtFrameId from "@src/domain/models/TennisCourtFrames/TennisCourtFrameId";
import TennisCourtFrameStatus from "@src/domain/models/TennisCourtFrames/TennisCourtFrameStatus";
import TennisCourtName from "@src/domain/models/TennisCourtFrames/TennisCourtName";
import UsageTime from "@src/domain/models/TennisCourtFrames/UsageTime";
import FirestoreDatabase from "@src/infrastructure/FirestoreDatabase";

// fix: `thrown: "Exceeded timeout of 5000 ms for a test.`
jest.setTimeout(30000);

describe("TennisCourtFrameRepository", () => {
  describe("#find, #save", () => {
    let repo: TennisCourtFrameRepository;
    let frameId: TennisCourtFrameId;

    beforeEach(async () => {
      repo = new TennisCourtFrameRepository(new FirestoreDatabase());
      frameId = TennisCourtFrameId.build();
    });

    afterEach(async () => {
      await repo.delete(frameId);
    });

    it("TennisCourtFrame を永続化し、再取得できる", async () => {
      const frame = new TennisCourtFrame(
        frameId,
        FacilityId.build(),
        new TennisCourtName("テストテニスコート"),
        new UsageTime(new Date(2021, 12, 26, 15), new Date(2021, 12, 26, 17)),
        new TennisCourtFrameStatus("available")
      );
      await repo.save(frame);

      const foundFrame = await repo.find(frameId);
      expect(foundFrame?.isEqual(frame)).toBeTruthy();
      expect(foundFrame?.isSameFrame(foundFrame)).toBeTruthy();
    });
  });

  describe("#delete", () => {
    let repo: TennisCourtFrameRepository;
    let frameId: TennisCourtFrameId;

    beforeEach(async () => {
      repo = new TennisCourtFrameRepository(new FirestoreDatabase());
      frameId = TennisCourtFrameId.build();

      const frame = new TennisCourtFrame(
        frameId,
        FacilityId.build(),
        new TennisCourtName("テストテニスコート"),
        new UsageTime(new Date(2022, 1 - 1, 6, 15), new Date(2022, 1 - 1, 6, 17)),
        new TennisCourtFrameStatus("available")
      );
      await repo.save(frame);
    });

    afterEach(async () => {
      await repo.delete(frameId);
    });

    it("TennisCourtFrame を削除できる", async () => {
      const beforeFrame = await repo.find(frameId);
      expect(beforeFrame).not.toBeUndefined();

      await repo.delete(frameId);

      const afterFrame = await repo.find(frameId);
      expect(afterFrame).toBeUndefined();
    });
  });

  describe("#all", () => {
    let repo: TennisCourtFrameRepository;
    let frameId1: TennisCourtFrameId;
    let frameId2: TennisCourtFrameId;
    let frame1: TennisCourtFrame;
    let frame2: TennisCourtFrame;

    beforeEach(async () => {
      repo = new TennisCourtFrameRepository(new FirestoreDatabase());
      frameId1 = TennisCourtFrameId.build();
      frameId2 = TennisCourtFrameId.build();

      frame1 = new TennisCourtFrame(
        frameId1,
        FacilityId.build(),
        new TennisCourtName("テストテニスコート1"),
        new UsageTime(new Date(2021, 12, 26, 15), new Date(2021, 12, 26, 17)),
        new TennisCourtFrameStatus("available")
      );
      await repo.save(frame1);

      frame2 = new TennisCourtFrame(
        frameId2,
        FacilityId.build(),
        new TennisCourtName("テストテニスコート2"),
        new UsageTime(new Date(2021, 12, 26, 15), new Date(2021, 12, 26, 17)),
        new TennisCourtFrameStatus("available")
      );
      await repo.save(frame2);
    });

    afterEach(async () => {
      await repo.delete(frameId1);
      await repo.delete(frameId2);
    });

    it("全ての TennisCourtFrame を取得できる", async () => {
      const frames = await repo.all();
      expect(frames.length).toEqual(2);
    });
  });
});
