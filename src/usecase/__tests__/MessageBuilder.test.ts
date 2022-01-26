import MessageBuilder from "../MessageBuilder";
import Facility from "@src/domain/models/Organizations/Facility";
import FacilityId from "@src/domain/models/Organizations/FacilityId";
import FacilityName from "@src/domain/models/Organizations/FacilityName";
import Organization from "@src/domain/models/Organizations/Organization";
import OrganizationId from "@src/domain/models/Organizations/OrganizationId";
import OrganizationName from "@src/domain/models/Organizations/OrganizationName";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";
import TennisCourtFrameId from "@src/domain/models/TennisCourtFrames/TennisCourtFrameId";
import TennisCourtFrameStatus from "@src/domain/models/TennisCourtFrames/TennisCourtFrameStatus";
import TennisCourtName from "@src/domain/models/TennisCourtFrames/TennisCourtName";
import UsageTime from "@src/domain/models/TennisCourtFrames/UsageTime";

describe("MessageBuilder", () => {
  describe("#buildMessage", () => {
    /* eslint-disable no-irregular-whitespace */
    const expectedText = `# 板橋区 東板橋庭球場
- 東板橋庭球場　３面 2022-01-15 11:00~13:00
- 東板橋庭球場　４面 2022-01-15 11:00~13:00

# 板橋区 東板橋庭球場
- 東板橋庭球場　３面 2022-01-15 11:00~13:00
- 東板橋庭球場　４面 2022-01-15 11:00~13:00
`;
    /* eslint-enable no-irregular-whitespace */

    it("通知メッセージを構築する", () => {
      const facility = new Facility(FacilityId.build(), new FacilityName("東板橋庭球場"));
      const organization = new Organization(OrganizationId.build(), new OrganizationName("板橋区"), [facility]);
      const tennisCourtFrame1 = new TennisCourtFrame(
        TennisCourtFrameId.build(),
        facility.id,
        new TennisCourtName("東板橋庭球場　３面"),
        new UsageTime(new Date(2022, 1 - 1, 15, 11, 0), new Date(2022, 1 - 1, 15, 13, 0)),
        new TennisCourtFrameStatus("available")
      );
      const tennisCourtFrame2 = new TennisCourtFrame(
        TennisCourtFrameId.build(),
        facility.id,
        new TennisCourtName("東板橋庭球場　４面"),
        new UsageTime(new Date(2022, 1 - 1, 15, 11, 0), new Date(2022, 1 - 1, 15, 13, 0)),
        new TennisCourtFrameStatus("available")
      );

      const mb = new MessageBuilder();
      const text = mb.buildMessage([organization, organization], [tennisCourtFrame1, tennisCourtFrame2]);

      expect(text).toEqual(expectedText);
    });
  });
});
