import { readFile } from "fs/promises";
import { join } from "path";
import parseHtmlTable from "../parseHtmlTable";

describe("parseHtmlTable()", () => {
  const expectedArray = [
    [
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
    ],
    [
      "前の31日分ボタン",
      "前の31日分ボタン",
      "4月20日",
      "4月21日",
      "4月22日",
      "4月23日",
      "4月24日",
      "4月25日",
      "4月26日",
      "4月27日",
      "4月28日",
      "4月29日",
      "4月30日",
      "5月1日",
      "5月2日",
      "5月3日",
      "5月4日",
      "5月5日",
      "5月6日",
      "5月7日",
      "5月8日",
      "5月9日",
      "5月10日",
      "5月11日",
      "5月12日",
      "5月13日",
      "5月14日",
      "5月15日",
      "5月16日",
      "5月17日",
      "5月18日",
      "5月19日",
      "5月20日",
    ],
    ["東板橋庭球場（軟式優先）３面"],
    [
      "東板橋庭球場（軟式優先）３面",
      "09:00 ～11:00",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "空いています",
      "空いています",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
    ],
    [
      "東板橋庭球場（軟式優先）３面",
      "11:00 ～13:00",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "空いています",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
    ],
    [
      "東板橋庭球場（軟式優先）３面",
      "13:00 ～15:00",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
    ],
    [
      "東板橋庭球場（軟式優先）３面",
      "15:00 ～17:00",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "空いています",
      "予約済みです",
      "予約済みです",
      "空いています",
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
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
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
    [""],
    [
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
      "● 土日祝の第３面はソフトテニス優先面（硬式抽選申込不可）となります。",
    ],
    [
      "前の31日分ボタン",
      "前の31日分ボタン",
      "4月20日",
      "4月21日",
      "4月22日",
      "4月23日",
      "4月24日",
      "4月25日",
      "4月26日",
      "4月27日",
      "4月28日",
      "4月29日",
      "4月30日",
      "5月1日",
      "5月2日",
      "5月3日",
      "5月4日",
      "5月5日",
      "5月6日",
      "5月7日",
      "5月8日",
      "5月9日",
      "5月10日",
      "5月11日",
      "5月12日",
      "5月13日",
      "5月14日",
      "5月15日",
      "5月16日",
      "5月17日",
      "5月18日",
      "5月19日",
      "5月20日",
    ],
    ["東板橋庭球場（硬軟兼用）４面"],
    [
      "東板橋庭球場（硬軟兼用）４面",
      "09:00 ～11:00",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "空いています",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "空いています",
      "予約済みです",
      "予約済みです",
      "予約済みです",
    ],
    [
      "東板橋庭球場（硬軟兼用）４面",
      "11:00 ～13:00",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "空いています",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "空いています",
      "予約済みです",
      "予約済みです",
      "予約済みです",
    ],
    [
      "東板橋庭球場（硬軟兼用）４面",
      "13:00 ～15:00",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
    ],
    [
      "東板橋庭球場（硬軟兼用）４面",
      "15:00 ～17:00",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
      "予約済みです",
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
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
      "ページの先頭へボタン",
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

  it("HTML の <table> を二次元配列に変換する", async () => {
    const htmlFilePath = join(__dirname, "__fixtures__", "20220420_higashi_itabashi_3_4_31days.html.txt");
    const html = await readFile(htmlFilePath);
    const array = parseHtmlTable(
      html.toString(),
      "table [summary='選択した施設・時間帯の空き状況を確認するための表。']"
    );

    // console.log("デバッグ用テーブル出力：");
    // console.log(array);

    expect(array).toEqual(expectedArray);
  });
});
