import ItabashiTennisCourtTable from "../ItabashiTennisCourtTable";
import FacilityName from "@src/domain/models/FacilityName";
import TennisCourt from "@src/domain/models/TennisCourt";
import TennisCourtName from "@src/domain/models/TennisCourtName";
import TennisCourtStatus from "@src/domain/models/TennisCourtStatus";
import UsageTime from "@src/domain/models/UsageTime";

describe("ItabashiTennisCourtName", () => {
  describe("#extractTennisCourt", () => {
    it("テーブルの配列から TennisCourt を全て抽出する", () => {
      const table = [
        ["● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。"],
        ["前の7日分ボタン", "前の7日分ボタン", "10月28日", "10月29日", "10月30日", "10月31日", "11月1日", "11月2日", "11月3日"],
        ["東板橋庭球場　３面"], // ITA-リザーブの rowspan の指定がおかしい
        ["東板橋庭球場　３面", "09:00 ～11:00", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです"],
        ["東板橋庭球場　３面", "11:00 ～13:00", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです"],
        ["東板橋庭球場　３面", "13:00 ～15:00", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです"],
        ["東板橋庭球場　３面", "15:00 ～16:00", "施設を利用できません", "施設を利用できません", "施設を利用できません", "施設を利用できません", "空いています", "予約済みです", "予約済みです"],
        ["東板橋庭球場　３面", "15:00 ～17:00", "空いています", "予約済みです", "予約済みです", "予約済みです", "施設を利用できません", "施設を利用できません", "施設を利用できません"],
        ["ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン"],
      ]
      const expectedFirstTennisCourt = new TennisCourt(
        new FacilityName("itabashi"),
        new TennisCourtName("東板橋庭球場　３面"),
        // TODO: 今月よりも小さい次の場合、来年と判断する
        new UsageTime(new Date(2021, 10 - 1, 28, 9, 0), new Date(2021, 10 - 1, 28, 11, 0)),
        new TennisCourtStatus("unavailable")
      )
      const expectedLastTennisCourt = new TennisCourt(
        new FacilityName("itabashi"),
        new TennisCourtName("東板橋庭球場　３面"),
        // TODO: 今月よりも小さい次の場合、来年と判断する
        new UsageTime(new Date(2021, 11 - 1, 3, 15, 0), new Date(2021, 11 - 1, 3, 17, 0)),
        new TennisCourtStatus("unavailable")
      )

      const itabashiTennisCourtTable = new ItabashiTennisCourtTable(table)
      const tennisCourts = itabashiTennisCourtTable.extractTennisCourts()

      expect(tennisCourts.length).toEqual(35)
      expect(tennisCourts[0].isSameTennisCourt(expectedFirstTennisCourt)).toBeTruthy()
      expect(tennisCourts[tennisCourts.length - 1].isSameTennisCourt(expectedLastTennisCourt)).toBeTruthy()
    })
  })
})
