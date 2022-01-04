import MockDate from "mockdate"; // eslint-disable-line node/no-unpublished-import
import ItabashiTennisCourtTable from "../ItabashiTennisCourtTable";
import FacilityName from "@src/domain/models/Organizations/FacilityName";
import OrganizationName from "@src/domain/models/Organizations/OrganizationName";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";
import TennisCourtFrameId from "@src/domain/models/TennisCourtFrames/TennisCourtFrameId";
import TennisCourtFrameStatus from "@src/domain/models/TennisCourtFrames/TennisCourtFrameStatus";
import TennisCourtName from "@src/domain/models/TennisCourtFrames/TennisCourtName";
import UsageTime from "@src/domain/models/TennisCourtFrames/UsageTime";
import OrganizationRepository from "@src/infrastructure/Organizations/OrganizationRepository";

describe("ItabashiTennisCourtName", () => {
  describe("#extractTennisCourt", () => {
    // HACK: 移行期間？なのか、15:00~16:00 が2行ある
    it.skip("テーブルの配列から TennisCourt を全て抽出する", async () => {
      MockDate.set(new Date(2021, 10 - 1, 27));
      const orgRepo = new OrganizationRepository();
      const org = await orgRepo.findByName(new OrganizationName("板橋区"));
      const facility = org?.findFacilityByName(new FacilityName("東板橋庭球場"));
      if (facility === undefined) {
        throw new Error("Facility が undefined です");
      }

      const table = [
        [
          "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。",
          "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。",
          "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。",
          "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。",
          "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。",
          "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。",
          "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。",
          "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。",
          "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。",
        ],
        [
          "前の7日分ボタン",
          "前の7日分ボタン",
          "10月28日",
          "10月29日",
          "10月30日",
          "10月31日",
          "11月1日",
          "11月2日",
          "11月3日",
        ],
        ["東板橋庭球場　３面"], // ITA-リザーブの rowspan の指定がおかしい
        [
          "東板橋庭球場　３面",
          "09:00 ～11:00",
          "予約済みです",
          "予約済みです",
          "予約済みです",
          "予約済みです",
          "予約済みです",
          "予約済みです",
          "予約済みです",
        ],
        [
          "東板橋庭球場　３面",
          "11:00 ～13:00",
          "予約済みです",
          "予約済みです",
          "予約済みです",
          "予約済みです",
          "予約済みです",
          "予約済みです",
          "予約済みです",
        ],
        [
          "東板橋庭球場　３面",
          "13:00 ～15:00",
          "予約済みです",
          "予約済みです",
          "予約済みです",
          "予約済みです",
          "予約済みです",
          "予約済みです",
          "予約済みです",
        ],
        [
          "東板橋庭球場　３面",
          "15:00 ～16:00",
          "施設を利用できません",
          "施設を利用できません",
          "施設を利用できません",
          "施設を利用できません",
          "空いています",
          "予約済みです",
          "予約済みです",
        ],
        [
          "ページの先頭へボタン",
          "ページの先頭へボタン",
          "ページの先頭へボタン",
          "ページの先頭へボタン",
          "ページの先頭へボタン",
          "ページの先頭へボタン",
          "ページの先頭へボタン",
          "ページの先頭へボタン",
          "ページの先頭へボタン",
        ],
      ];
      const expectedFirstTennisCourt = new TennisCourtFrame(
        facility.id,
        new TennisCourtName("東板橋庭球場　３面"),
        new UsageTime(new Date(2021, 10 - 1, 28, 9, 0), new Date(2021, 10 - 1, 28, 11, 0)),
        new TennisCourtFrameStatus("unavailable"),
        TennisCourtFrameId.build()
      );
      const expectedLastTennisCourt = new TennisCourtFrame(
        facility.id,
        new TennisCourtName("東板橋庭球場　３面"),
        new UsageTime(new Date(2021, 11 - 1, 3, 15, 0), new Date(2021, 11 - 1, 3, 16, 0)),
        new TennisCourtFrameStatus("unavailable"),
        TennisCourtFrameId.build()
      );

      const itabashiTennisCourtTable = new ItabashiTennisCourtTable(table);
      const tennisCourtFrames = await itabashiTennisCourtTable.extractTennisCourts();

      expect(tennisCourtFrames.length).toEqual(28);
      expect(tennisCourtFrames[0].isSameFrame(expectedFirstTennisCourt)).toBeTruthy();
      expect(tennisCourtFrames[tennisCourtFrames.length - 1].isSameFrame(expectedLastTennisCourt)).toBeTruthy();
    });
  });

  describe("#getYearByMonth", () => {
    it.each([
      { today: new Date(2021, 12 - 1, 30), month: 12, expected: 2021 },
      { today: new Date(2021, 12 - 1, 30), month: 1, expected: 2022 },
    ])("month が今年より前の場合は来年、それ以外は今年と判断する", ({ today, month, expected }) => {
      MockDate.set(today);
      const itabashiTennisCourtTable = new ItabashiTennisCourtTable([]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      expect((itabashiTennisCourtTable as any).getYearByMonth(month)).toEqual(expected);
    });
  });
});
