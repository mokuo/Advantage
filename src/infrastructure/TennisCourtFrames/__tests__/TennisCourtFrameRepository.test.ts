import TennisCourtFrameRepository from "../TennisCourtFrameRepository";
import FacilityId from "@src/domain/models/Organizations/FacilityId";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";
import TennisCourtFrameId from "@src/domain/models/TennisCourtFrames/TennisCourtFrameId";
import TennisCourtFrameStatus from "@src/domain/models/TennisCourtFrames/TennisCourtFrameStatus";
import TennisCourtName from "@src/domain/models/TennisCourtFrames/TennisCourtName";
import UsageTime from "@src/domain/models/TennisCourtFrames/UsageTime";
import FirestoreDatabase from "@src/infrastructure/FirestoreDatabase";

describe("TennisCourtFrameRepository", () => {
  describe("#find", () => {
    it("hoge", async () => {
      const repo = new TennisCourtFrameRepository(new FirestoreDatabase());

      const frameId = TennisCourtFrameId.build();
      const frame = new TennisCourtFrame(
        frameId,
        FacilityId.build(),
        new TennisCourtName("テストテニスコート"),
        new UsageTime(new Date(2021, 12, 26, 15), new Date(2021, 12, 26, 17)),
        new TennisCourtFrameStatus("available")
      );
      await repo.save(frame);

      const foundFrame = await repo.find(frameId);
      expect(foundFrame?.id.isEqual(frame.id)).toBeTruthy();
      expect(foundFrame?.isSameFrame(foundFrame)).toBeTruthy();
    });
  });
});
