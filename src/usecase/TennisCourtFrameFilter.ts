import dayjs from "dayjs";
import japaneseHolidays from "./japaneseHolidays";
import TennisCourtFrame from "#src/domain/models/TennisCourtFrames/TennisCourtFrame";

class TennisCourtFrameFilter {
  filter(tennisCourtFrames: TennisCourtFrame[]) {
    return tennisCourtFrames.filter((tcf) => tcf.usageTime.isSaturdayOrSunday() || this.isHoliday(tcf));
  }

  private isHoliday(tennisCourtFrame: TennisCourtFrame) {
    const holidays = japaneseHolidays.concat(this.envHolidays());
    const startTime = tennisCourtFrame.usageTime.getStartTime();

    return holidays.some(
      (holiday) =>
        startTime.getFullYear() === holiday.getFullYear() &&
        startTime.getMonth() === holiday.getMonth() &&
        startTime.getDate() === holiday.getDate()
    );
  }

  private envHolidays(): Date[] {
    if (process.env.HOLIDAYS) {
      const holidays = process.env.HOLIDAYS.split(",");
      return holidays.map((holiday) => {
        const day = dayjs(holiday);
        return day.toDate();
      });
    }
    return [];
  }
}

export default TennisCourtFrameFilter;
