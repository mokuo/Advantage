import BaseReservationSystemRepository from "./BaseReservationSystemRepository";
import ItabashiTennisCourtTable from "./ItabashiTennisCourtTable";
import IReservationSystemRepository from "@src/domain/models/TennisCourtFrames/IReservationSystemRepository";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";
import parseHtmlTable from "@src/lib/parseHtmlTable";

const URL = "https://www.itabashi-shisetsu-yoyaku.jp/eshisetsu/menu/Login.cgi";
const TABLE_SELECTOR = "table [summary='選択した施設・時間帯の空き状況を確認するための表。']";
// HACK: 移行期間？なのか、15:00~16:00 が2行ある
// const TENNIS_COURT_ROW_SIZE = 8
const TENNIS_COURT_ROW_SIZE = 9;

class ItabashiReservationSystemRepository
  extends BaseReservationSystemRepository
  implements IReservationSystemRepository
{
  async all(): Promise<TennisCourtFrame[]> {
    const context = await this.browser.newContext();
    const page = await context.newPage();

    await page.goto(URL);
    await this.waitAndClick(page, "img[alt='空き照会のみのかたはこちら…ボタン']");
    await this.waitAndClick(page, "#selectbox a"); // 空き照会・予約
    await this.waitAndClick(page, "tr:nth-child(2)"); // 利用目的から絞り込む
    await this.waitAndClick(page, "tr[onclick*='E00']"); // スポーツ（屋外）
    await this.waitAndClick(page, "tr[onclick*='E06']"); // 硬式テニス
    await this.waitAndClick(page, "tr:nth-child(8)"); // 東板橋庭球場（３，４面）
    // await sleep(10000); // 「東板橋庭球場（３，４面）」にチェックが入るまで待つ
    await page.waitForSelector("img#i_record6[alt='選択済み']"); // 「東板橋庭球場（３，４面）」にチェックが入るまで待つ
    await this.waitAndClick(page, "img[alt='次に進むボタン']"); // 次に進む
    await this.waitAndClick(page, "img[alt='31日表示 未選択']"); // ３１日表示
    await this.waitAndClick(page, "img[alt='表示ボタン']"); // 表示
    await page.waitForSelector(TABLE_SELECTOR);

    const html = await page.content();
    await page.close();

    const table = parseHtmlTable(html, TABLE_SELECTOR);
    const tennisCourtFrames: TennisCourtFrame[] = [];

    // テニスコートの数だけテーブルを取り出す
    const tanbleCount = (table.length + 1) / (TENNIS_COURT_ROW_SIZE + 1); // 行数を 1 増やして空行含めた行数で割って、テーブル数を算出する
    for (let i = 0; i < tanbleCount; i += 1) {
      const tennisCourtTable = table.splice(0, TENNIS_COURT_ROW_SIZE);
      const itabashiTennisCourtTable = new ItabashiTennisCourtTable(tennisCourtTable);
      // eslint-disable-next-line no-await-in-loop
      const frames = await itabashiTennisCourtTable.extractTennisCourts();
      tennisCourtFrames.push(...frames);

      table.splice(0, 1); // 空行を削除
    }

    return tennisCourtFrames;
  }
}

export default ItabashiReservationSystemRepository;
