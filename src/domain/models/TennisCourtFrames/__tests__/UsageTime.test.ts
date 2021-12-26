import dayjs from "dayjs";
import UsageTime, { DifferentDatesError, StartTimeIsAfterEndTimeError } from "../UsageTime";

describe("UsageTime", () => {
  describe(".constructor", () => {
    describe("startTime と endTime が違う日付の時", () => {
      it("エラーになる", () => {
        expect(() => {
          const startTime = dayjs();
          const endTime = startTime.add(1, "day");
          // eslint-disable-next-line no-new
          new UsageTime(startTime.toDate(), endTime.toDate());
        }).toThrowError(new DifferentDatesError());
      });
    });

    describe("startTime が endTime より遅い時", () => {
      it("エラーになる", () => {
        expect(() => {
          const startDate = dayjs();
          const endDate = startDate.add(-1, "minute");
          // eslint-disable-next-line no-new
          new UsageTime(startDate.toDate(), endDate.toDate());
        }).toThrowError(new StartTimeIsAfterEndTimeError());
      });
    });
  });
});
