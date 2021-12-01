import { JSDOM } from "jsdom";
import KeyValueStock from "./KeyValueStock";

const parseHtmlTable = (htmlTable: string, tableSelector = "table"): string[][] => {
  const table: string[][] = []
  const stock = new KeyValueStock()

  const {document} = new JSDOM(htmlTable).window
  // TODO: 複数 table に対応する
  const tableElement = document.querySelector(tableSelector)
  if (tableElement === null) { throw new Error("<table> がありません") }

  const trNodeList = tableElement.querySelectorAll("tr")

  trNodeList.forEach((trElement, rowIndex) => {
    table[rowIndex] = []
    let columnIndex = 0
    const cellNodeList = trElement.querySelectorAll<HTMLTableCellElement>("th,td") // cell = <th> or <td>

    cellNodeList.forEach(cellElement => {
      // ストックがあれば使う
      const stockedCell = stock.pop(`${rowIndex}:${columnIndex}`)
      if (stockedCell) {
        table[rowIndex][columnIndex] = stockedCell
        columnIndex += 1
      }

      // NOTE: rowspan, colspan の指定がない場合は、rowSpan, colSpan に 1 が入る
      const {rowSpan, colSpan} = cellElement
      // th, td の中のテキストを取り出す。img なら alt を取得する。
      const cellText = cellElement.textContent?.trim() || cellElement.querySelector("img")?.alt.trim() || ""

      // rowSpan が 1 より大きいなら、その分ストックする
      for (let i = 1; i < rowSpan; i += 1) {
        stock.add(`${rowIndex + i}:${columnIndex}`, cellText)
      }

      // colSpan の数だけループする
      for (let i = 0; i < colSpan; i += 1) {
        table[rowIndex][columnIndex] = cellText
        columnIndex += 1
      }
    })
  })

  return table
}

export default parseHtmlTable
