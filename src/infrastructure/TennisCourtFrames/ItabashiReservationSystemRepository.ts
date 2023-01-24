import BaseReservationSystemRepository from "./BaseReservationSystemRepository";
import ItabashiTennisCourtTable from "./ItabashiTennisCourtTable";
import IReservationSystemRepository from "#src/domain/models/TennisCourtFrames/IReservationSystemRepository";
import TennisCourtFrame from "#src/domain/models/TennisCourtFrames/TennisCourtFrame";
import parseHtmlTable from "#src/lib/parseHtmlTable";
import sleep from "#src/lib/sleep";

const URL = "https://www.itabashi-shisetsu-yoyaku.jp/eshisetsu/menu/Login.cgi";
const TABLE_SELECTOR = "table [summary='選択した施設・時間帯の空き状況を確認するための表。']";

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
    await sleep(100); // 「東板橋庭球場（３，４面）」のクリックに失敗することがあるので、0.1秒待つ
    await this.waitAndClick(page, "tr:nth-child(7)"); // 東板橋庭球場（３，４面）
    await page.waitForSelector("img#i_record5[alt='選択済み']"); // 「東板橋庭球場（３，４面）」にチェックが入るまで待つ
    await this.waitAndClick(page, "img[alt='次に進むボタン']"); // 次に進む
    await this.waitAndClick(page, "img[alt='31日表示 未選択']"); // ３１日表示
    await this.waitAndClick(page, "img[alt='表示ボタン']"); // 表示
    await page.waitForSelector(TABLE_SELECTOR);

    const html = await page.content();
    await page.close();

    const table = parseHtmlTable(html, TABLE_SELECTOR);
    return new ItabashiTennisCourtTable().extractTennisCourtFrames(table);
  }
}

export default ItabashiReservationSystemRepository;
