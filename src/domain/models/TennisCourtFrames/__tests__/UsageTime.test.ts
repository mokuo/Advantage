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

  describe("#toString", () => {
    it("文字列を見やすい形で返す", () => {
      const usageTime = new UsageTime(new Date(2022, 1 - 1, 25, 9), new Date(2022, 1 - 1, 25, 11));
      const expectedText = "2022-01-25 09:00~11:00";

      expect(usageTime.toString()).toEqual(expectedText);
    });
  });
});
