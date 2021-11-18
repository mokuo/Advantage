import FacilityName from "@src/domain/models/FacilityName";
import TennisCourt from "@src/domain/models/TennisCourt";
import TennisCourtName from "@src/domain/models/TennisCourtName";
import TennisCourtStatus from "@src/domain/models/TennisCourtStatus";
import UsageTime from "@src/domain/models/UsageTime";

class UnexpectedValueError extends Error {}

class ItabashiTennisCourtTable {
  private table: string[][]
  
  constructor(table: string[][]) {
    this.table = table
  }

  extractTennisCourts(): TennisCourt[] {
    const days: string[] = this.table[1].slice(2)
    const tennisCourts: TennisCourt[] = []

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
        
        const tennisCourt = new TennisCourt(
          new FacilityName("itabashi"),
          tennisCourtName,
          usageTime,
          tennisCourtStatus
        )
        tennisCourts.push(tennisCourt)
      }
    }

    return tennisCourts 
  }

  private buildTennisCourtStatus(value: string): TennisCourtStatus {
    return new TennisCourtStatus(value === "空いています" ? "available" : "unavailable")
  }

  private buildUsageTime(rawDate: string, rawTime: string) {
    const dateGroups = /(?<month>\d{1,2})月(?<day>\d{1,2})日/.exec(rawDate)?.groups
    const timeGroups = /(?<startHour>\d{2}):(?<startMinute>\d{2}).+(?<endHour>\d{2}):(?<endMinute>\d{2})/.exec(rawTime)?.groups
    if (!dateGroups) { throw new UnexpectedValueError(`不正な日付です: ${rawDate}`) }
    if (!timeGroups) { throw new UnexpectedValueError(`不正な時刻です: ${rawTime}`) }

    // TODO: 今月よりも小さい次の場合、来年と判断する
    const year = new Date().getFullYear()
    const startTime = new Date(
      year,
      Number(dateGroups.month) - 1,
      Number(dateGroups.day),
      Number(timeGroups.startHour),
      Number(timeGroups.startMinute)
    )
    const endTime = new Date(
      year,
      Number(dateGroups.month) - 1,
      Number(dateGroups.day),
      Number(timeGroups.endHour),
      Number(timeGroups.endMinute)
    )

    return new UsageTime(startTime, endTime)
  }
}

export default ItabashiTennisCourtTable
