import OrganizationRepository from "../Organizations/OrganizationRepository";
import Facility from "@src/domain/models/Organizations/Facility";
import FacilityName from "@src/domain/models/Organizations/FacilityName";
import OrganizationName from "@src/domain/models/Organizations/OrganizationName";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";
import TennisCourtFrameId from "@src/domain/models/TennisCourtFrames/TennisCourtFrameId";
import TennisCourtFrameStatus from "@src/domain/models/TennisCourtFrames/TennisCourtFrameStatus";
import TennisCourtName from "@src/domain/models/TennisCourtFrames/TennisCourtName";
import UsageTime from "@src/domain/models/TennisCourtFrames/UsageTime";

class UnexpectedValueError extends Error {}
class FacilityNotFoundError extends Error {}

const ORGANIZATION_NAME = "板橋区";
const FACILITY_NAME = "東板橋庭球場";

class ItabashiTennisCourtTable {
  private table: string[][];

  constructor(table: string[][]) {
    this.table = table;
  }

  async extractTennisCourts(): Promise<TennisCourtFrame[]> {
    const days: string[] = this.table[1].slice(2);
    const tennisCourtFrames: TennisCourtFrame[] = [];
    const facility = await this.getFacility();

    // HACK: 予約枠の行を取り出して、forEach とかで回す
    for (let i = 3; i < this.table.length - 1; i += 1) {
      const row = this.table[i];
      const tennisCourtName = new TennisCourtName(row[0]);
      const time = row[1];
      const reservationFrames = row.slice(2);

      for (let j = 0; j < reservationFrames.length; j += 1) {
        const frame = reservationFrames[j];
        const tennisCourtFrameStatus = this.buildTennisCourtFrameStatus(frame);
        const usageTime = this.buildUsageTime(days[j], time);

        const tennisCourt = new TennisCourtFrame(
          TennisCourtFrameId.build(),
          facility.id,
          tennisCourtName,
          usageTime,
          tennisCourtFrameStatus
        );
        tennisCourtFrames.push(tennisCourt);
      }
    }

    return tennisCourtFrames;
  }

  private buildTennisCourtFrameStatus(value: string): TennisCourtFrameStatus {
    return new TennisCourtFrameStatus(value === "空いています" ? "available" : "unavailable");
  }

  private buildUsageTime(rawDate: string, rawTime: string) {
    const dateGroups = /(?<month>\d{1,2})月(?<day>\d{1,2})日/.exec(rawDate)?.groups;
    const timeGroups = /(?<startHour>\d{2}):(?<startMinute>\d{2}).+(?<endHour>\d{2}):(?<endMinute>\d{2})/.exec(
      rawTime
    )?.groups;
    if (!dateGroups) {
      throw new UnexpectedValueError(`不正な日付です: ${rawDate}`);
    }
    if (!timeGroups) {
      throw new UnexpectedValueError(`不正な時刻です: ${rawTime}`);
    }

    const month = Number(dateGroups.month);
    const year = this.getYearByMonth(month);

    const startTime = new Date(
      year,
      month - 1,
      Number(dateGroups.day),
      Number(timeGroups.startHour),
      Number(timeGroups.startMinute)
    );
    const endTime = new Date(
      year,
      month - 1,
      Number(dateGroups.day),
      Number(timeGroups.endHour),
      Number(timeGroups.endMinute)
    );

    return new UsageTime(startTime, endTime);
  }

  private getYearByMonth(month: number) {
    const today = new Date();
    const thisYear = today.getFullYear();
    const thisMonth = today.getMonth() + 1;

    // NOTE: month が今月より前の場合は来年、それ以外は今年と判断する。今月来月くらいしか表示しない前提。
    return month < thisMonth ? thisYear + 1 : thisYear;
  }

  private async getFacility(): Promise<Facility> {
    const orgRepo = new OrganizationRepository();
    const org = await orgRepo.findByName(new OrganizationName(ORGANIZATION_NAME));
    const facility = org?.findFacilityByName(new FacilityName(FACILITY_NAME));
    if (facility === undefined) {
      throw new FacilityNotFoundError();
    }

    return facility;
  }
}

export default ItabashiTennisCourtTable;
