import { readFile } from "fs/promises";
import { join } from "path";
import parseHtmlTable from "../parseHtmlTable";

describe("parseHtmlTable()", () => {
  const expectedArray = [
    ["● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。"],
    ["前の7日分ボタン", "前の7日分ボタン", "10月28日", "10月29日", "10月30日", "10月31日", "11月1日", "11月2日", "11月3日"],
    ["東板橋庭球場　３面"], // ITA-リザーブの rowspan の指定がおかしい
    ["東板橋庭球場　３面", "09:00 ～11:00", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです"],
    ["東板橋庭球場　３面", "11:00 ～13:00", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです"],
    ["東板橋庭球場　３面", "13:00 ～15:00", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです"],
    ["東板橋庭球場　３面", "15:00 ～16:00", "施設を利用できません", "施設を利用できません", "施設を利用できません", "施設を利用できません", "空いています", "予約済みです", "予約済みです"],
    ["東板橋庭球場　３面", "15:00 ～17:00", "空いています", "予約済みです", "予約済みです", "予約済みです", "施設を利用できません", "施設を利用できません", "施設を利用できません"],
    ["ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン"],
    [""],
    ["● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。", "● 令和４年３月３１日まで土日祝の第３面はソフトテニス優先面となります。"],
    ["前の7日分ボタン", "前の7日分ボタン", "10月28日", "10月29日", "10月30日", "10月31日", "11月1日", "11月2日", "11月3日"],
    ["東板橋庭球場　４面"], // ITA-リザーブの rowspan の指定がおかしい
    ["東板橋庭球場　４面", "09:00 ～11:00", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "空いています", "予約済みです", "予約済みです"],
    ["東板橋庭球場　４面", "11:00 ～13:00", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "空いています", "予約済みです", "予約済みです"],
    ["東板橋庭球場　４面", "13:00 ～15:00", "空いています", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "予約済みです"],
    ["東板橋庭球場　４面", "15:00 ～16:00", "施設を利用できません", "施設を利用できません", "施設を利用できません", "施設を利用できません", "予約済みです", "予約済みです", "予約済みです"],
    ["東板橋庭球場　４面", "15:00 ～17:00", "予約済みです", "予約済みです", "予約済みです", "予約済みです", "施設を利用できません", "施設を利用できません", "施設を利用できません"],
    ["ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン", "ページの先頭へボタン"]
  ]

  it("hoge", async () => {
    const htmlFilePath = join(__dirname, "__fixtures__","20211028_higashi_itabashi_3_4_31days.html.txt")
    const html = await readFile(htmlFilePath)
    const array = parseHtmlTable(html.toString(), "[summary='選択した施設・時間帯の空き状況を確認するための表。']")

    expect(array).toEqual(expectedArray)
  })
})
