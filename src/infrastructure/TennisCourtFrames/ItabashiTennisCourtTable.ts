import FacilityId from "@src/domain/models/Organizations/FacilityId";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";
import TennisCourtId from "@src/domain/models/TennisCourtFrames/TennisCourtId";
import TennisCourtName from "@src/domain/models/TennisCourtFrames/TennisCourtName";
import TennisCourtStatus from "@src/domain/models/TennisCourtFrames/TennisCourtStatus";
import UsageTime from "@src/domain/models/TennisCourtFrames/UsageTime";

class UnexpectedValueError extends Error {}

class ItabashiTennisCourtTable {
  private table: string[][]
  
  constructor(table: string[][]) {
    this.table = table
  }

  extractTennisCourts(): TennisCourtFrame[] {
    const days: string[] = this.table[1].slice(2)
    const tennisCourtFrames: TennisCourtFrame[] = []

    // HACK: 予約枠の行を取り出して、forEach とかで回す
    for (let i = 3; i < this.table.length - 1; i += 1) {
      const row = this.table[i];
      const tennisCourtName = new TennisCourtName(row[0])
      const time = row[1]
      const reservationFrames = row.slice(2)

      for (let j = 0; j < reservationFrames.length; j += 1) {
        const frame = reservationFrames[j];
        const tennisCourtStatus = this.buildTennisCourtStatus(frame)
        const usageTime = this.buildUsageTime(days[j], time)
        
        const tennisCourt = new TennisCourtFrame(
          TennisCourtId.build(),
          new FacilityName("itabashi"),
          tennisCourtName,
          usageTime,
          tennisCourtStatus
        )
        tennisCourtFrames.push(tennisCourt)
      }
    }

    return tennisCourtFrames 
  }

  private buildTennisCourtStatus(value: string): TennisCourtStatus {
    return new TennisCourtStatus(value === "空いています" ? "available" : "unavailable")
  }

  private buildUsageTime(rawDate: string, rawTime: string) {
    const dateGroups = /(?<month>\d{1,2})月(?<day>\d{1,2})日/.exec(rawDate)?.groups
    const timeGroups = /(?<startHour>\d{2}):(?<startMinute>\d{2}).+(?<endHour>\d{2}):(?<endMinute>\d{2})/.exec(rawTime)?.groups
    if (!dateGroups) { throw new UnexpectedValueError(`不正な日付です: ${rawDate}`) }
    if (!timeGroups) { throw new UnexpectedValueError(`不正な時刻です: ${rawTime}`) }

    const month = Number(dateGroups.month)
    const year = this.getYearByMonth(month)

    const startTime = new Date(
      year,
      month - 1,
      Number(dateGroups.day),
      Number(timeGroups.startHour),
      Number(timeGroups.startMinute)
    )
    const endTime = new Date(
      year,
      month - 1,
      Number(dateGroups.day),
      Number(timeGroups.endHour),
      Number(timeGroups.endMinute)
    )

    return new UsageTime(startTime, endTime)
  }

  private getYearByMonth(month: number) {
    const today = new Date()
    const thisYear = today.getFullYear()
    const thisMonth = today.getMonth() + 1

    // NOTE: month が今月より前の場合は来年、それ以外は今年と判断する。今月来月くらいしか表示しない前提。
    return month < thisMonth ? thisYear + 1 : thisYear
  }
}

export default ItabashiTennisCourtTable
