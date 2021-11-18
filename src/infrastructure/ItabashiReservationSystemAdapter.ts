import { Browser } from "playwright";
import BaseReservationSystemAdapter from "./BaseReservationSystemAdapter";
import IReservationSystemAdapter from "./IReservationSystemAdapter";
import TennisCourt from "@src/domain/models/TennisCourt";
import parseHtmlTable from "@src/lib/parseHtmlTable";

const URL = "https://www.itabashi-shisetsu-yoyaku.jp/eshisetsu/menu/Login.cgi"

class ItabashiReservationSystemAdapter extends BaseReservationSystemAdapter implements IReservationSystemAdapter  {
  async getTennisCourts(browser: Browser): Promise<TennisCourt[]> {
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto(URL)
    await this.waitAndClick(page, "img[alt='空き照会のみのかたはこちら…ボタン']")
    await this.waitAndClick(page, "#selectbox a") // 空き照会・予約
    await this.waitAndClick(page, "tr:nth-child(2)") // 利用目的から絞り込む
    await this.waitAndClick(page, "tr[onclick*='E00']") // スポーツ（屋外）
    await this.waitAndClick(page, "tr[onclick*='E06']") // 硬式テニス
    await this.waitAndClick(page, "tr:nth-child(8)") // 東板橋庭球場（３，４面）
    await page.waitForSelector("img#i_record6[alt='選択済み']") // 「東板橋庭球場（３，４面）」にチェックが入るまで待つ
    await this.waitAndClick(page, "img[alt='次に進むボタン']") // 次に進む
    await this.waitAndClick(page, "img[alt='31日表示 未選択']") // ３１日表示
    await this.waitAndClick(page, "img[alt='表示ボタン']") // 表示

    const html = await page.content()
    const table = parseHtmlTable(html)

    return [] // HACK
  }
}

export default ItabashiReservationSystemAdapter
