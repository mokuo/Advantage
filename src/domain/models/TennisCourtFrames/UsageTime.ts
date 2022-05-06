import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import IValueObject from "../IValueObject";

dayjs.extend(isSameOrAfter);

export class DifferentDatesError extends Error {}
export class StartTimeIsAfterEndTimeError extends Error {}

const DAY_MAP_JA: { [day: number]: string } = {
  0: "日",
  1: "月",
  2: "火",
  3: "水",
  4: "木",
  5: "金",
  6: "土",
};

class UsageTime implements IValueObject {
  private startTime: Dayjs;

  private endTime: Dayjs;

  constructor(startTime: Date, endTime: Date) {
    this.startTime = dayjs(startTime);
    this.endTime = dayjs(endTime);

    if (!this.startTime.isSame(this.endTime, "day")) {
      throw new DifferentDatesError();
    }

    if (this.startTime.isSameOrAfter(this.endTime, "minute")) {
      throw new StartTimeIsAfterEndTimeError();
    }
  }

  isEqual(other: UsageTime) {
    return this.startTime.isSame(other.startTime) && this.endTime.isSame(other.endTime);
  }

  getStartTime(): Date {
    return this.startTime.toDate();
  }

  getEndTime(): Date {
    return this.endTime.toDate();
  }

  toString(): string {
    return `${this.startTime.format("YYYY-MM-DD")}（${DAY_MAP_JA[this.startTime.day()]}）${this.startTime.format(
      "HH:mm"
    )}~${this.endTime.format("HH:mm")}`;
  }
}

export default UsageTime;
