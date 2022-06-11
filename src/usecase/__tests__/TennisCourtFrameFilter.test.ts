import TennisCourtFrameFilter from "../TennisCourtFrameFilter";
import Facility from "#src/domain/models/Organizations/Facility";
import FacilityId from "#src/domain/models/Organizations/FacilityId";
import FacilityName from "#src/domain/models/Organizations/FacilityName";
import TennisCourtFrame from "#src/domain/models/TennisCourtFrames/TennisCourtFrame";
import TennisCourtFrameId from "#src/domain/models/TennisCourtFrames/TennisCourtFrameId";
import TennisCourtFrameStatus from "#src/domain/models/TennisCourtFrames/TennisCourtFrameStatus";
import TennisCourtName from "#src/domain/models/TennisCourtFrames/TennisCourtName";
import UsageTime from "#src/domain/models/TennisCourtFrames/UsageTime";

describe("TennisCourtFrameFilter", () => {
  describe("#filter", () => {
    const facility = new Facility(FacilityId.build(), new FacilityName("東板橋庭球場"));
    const weekday = new TennisCourtFrame(
      TennisCourtFrameId.build(),
      facility.id,
      new TennisCourtName("平日"),
      new UsageTime(new Date(2022, 6 - 1, 10, 9, 0), new Date(2022, 6 - 1, 10, 11, 0)),
      new TennisCourtFrameStatus("available")
    );
    const holiday = new TennisCourtFrame(
      TennisCourtFrameId.build(),
      facility.id,
      new TennisCourtName("東板橋庭球場　３面"),
      new UsageTime(new Date(2022, 6 - 1, 12, 9, 0), new Date(2022, 6 - 1, 12, 11, 0)),
      new TennisCourtFrameStatus("available")
    );
    const japaneseHoliday = new TennisCourtFrame(
      TennisCourtFrameId.build(),
      facility.id,
      new TennisCourtName("東板橋庭球場　３面"),
      new UsageTime(new Date(2022, 7 - 1, 18, 9, 0), new Date(2022, 7 - 1, 18, 11, 0)),
      new TennisCourtFrameStatus("available")
    );
    const envHoliday = new TennisCourtFrame(
      TennisCourtFrameId.build(),
      facility.id,
      new TennisCourtName("東板橋庭球場　３面"),
      new UsageTime(new Date(2022, 6 - 1, 13, 9, 0), new Date(2022, 6 - 1, 13, 11, 0)),
      new TennisCourtFrameStatus("available")
    );

    it("土日祝日、環境変数に設定した日付に該当する TennisCourtFrame のみを返す", () => {
      process.env.HOLIDAYS = "2022-06-13,2022-06-22";

      const result = new TennisCourtFrameFilter().filter([weekday, holiday, japaneseHoliday, envHoliday]);

      expect(result.length).toEqual(3);
      expect(result.some((tcf) => tcf.name.toString() === "平日")).toBe(false);
    });
  });
});
