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
    it("TennisCourtFrame を永続化し、再取得できる", async () => {
      const repo = new TennisCourtFrameRepository(new FirestoreDatabase());

      const frameId = TennisCourtFrameId.build();
      const frame = new TennisCourtFrame(
        FacilityId.build(),
        new TennisCourtName("テストテニスコート"),
        new UsageTime(new Date(2021, 12, 26, 15), new Date(2021, 12, 26, 17)),
        new TennisCourtFrameStatus("available"),
        frameId
      );
      await repo.save(frame);

      const foundFrame = await repo.find(frameId);
      expect(foundFrame?.isEqual(frame)).toBeTruthy();
      expect(foundFrame?.isSameFrame(foundFrame)).toBeTruthy();
    });
  });
});
