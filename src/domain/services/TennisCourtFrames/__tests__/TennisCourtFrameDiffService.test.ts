import FacilityId from "src/domain/models/Organizations/FacilityId";
import TennisCourtFrame from "src/domain/models/TennisCourtFrames/TennisCourtFrame";
import TennisCourtFrameId from "src/domain/models/TennisCourtFrames/TennisCourtFrameId";
import TennisCourtFrameStatus from "src/domain/models/TennisCourtFrames/TennisCourtFrameStatus";
import TennisCourtName from "src/domain/models/TennisCourtFrames/TennisCourtName";
import UsageTime from "src/domain/models/TennisCourtFrames/UsageTime";
import TennisCourtFramesDiffService from "../TennisCourtFramesDiffService";

describe("TennisCourtFramesDiffService", () => {
  describe("#diff", () => {
    const facilityId = FacilityId.build();
    const oldFrames = [
      new TennisCourtFrame( // 削除される
        TennisCourtFrameId.build(),
        facilityId,
        new TennisCourtName("テストテニスコート１"),
        new UsageTime(new Date(2021, 12, 26, 15), new Date(2021, 12, 26, 17)),
        new TennisCourtFrameStatus("available")
      ),
      new TennisCourtFrame( // 利用可能になる
        TennisCourtFrameId.build(),
        facilityId,
        new TennisCourtName("テストテニスコート１"),
        new UsageTime(new Date(2021, 12, 31, 15), new Date(2021, 12, 31, 17)),
        new TennisCourtFrameStatus("unavailable")
      ),
      new TennisCourtFrame( // 変わらない
        TennisCourtFrameId.build(),
        facilityId,
        new TennisCourtName("テストテニスコート２"),
        new UsageTime(new Date(2021, 12, 31, 15), new Date(2021, 12, 31, 17)),
        new TennisCourtFrameStatus("unavailable")
      ),
    ];
    const newFrames = [
      new TennisCourtFrame( // 利用可能になる
        TennisCourtFrameId.build(),
        facilityId,
        new TennisCourtName("テストテニスコート１"),
        new UsageTime(new Date(2021, 12, 31, 15), new Date(2021, 12, 31, 17)),
        new TennisCourtFrameStatus("available")
      ),
      new TennisCourtFrame( // 変わらない
        TennisCourtFrameId.build(),
        facilityId,
        new TennisCourtName("テストテニスコート２"),
        new UsageTime(new Date(2021, 12, 31, 15), new Date(2021, 12, 31, 17)),
        new TennisCourtFrameStatus("unavailable")
      ),
      new TennisCourtFrame( // 追加される
        TennisCourtFrameId.build(),
        facilityId,
        new TennisCourtName("テストテニスコート２"),
        new UsageTime(new Date(2022, 1, 1, 15), new Date(2022, 1, 1, 17)),
        new TennisCourtFrameStatus("available")
      ),
    ];

    it("差分を返す", () => {
      const service = new TennisCourtFramesDiffService();
      const result = service.diff(oldFrames, newFrames);

      expect(result.deleted.length).toEqual(1);
      expect(result.deleted[0].isEqual(oldFrames[0])).toBeTruthy();
      expect(result.deleted[0].isSameFrame(oldFrames[0])).toBeTruthy();

      expect(result.changed.length).toEqual(1);
      const changedFrame = oldFrames[1];
      changedFrame.setStatus(new TennisCourtFrameStatus("available"));
      expect(result.changed[0].isEqual(changedFrame)).toBeTruthy();
      expect(result.changed[0].isSameFrame(changedFrame)).toBeTruthy();

      expect(result.added.length).toEqual(1);
      // 新規追加なので、TennisCourtFrameId はまだない
      expect(result.added[0].isSameFrame(newFrames[2])).toBeTruthy();
    });
  });
});
