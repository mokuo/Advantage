import IValueObject from "../IValueObject";

class UnknownStatusError extends Error {}

// ref: https://dackdive.hateblo.jp/entry/2019/08/13/090000
const STATUSES = ["available", "unavailable"] as const;
type Status = typeof STATUSES[number];

class TennisCourtFrameStatus implements IValueObject {
  private value: Status;

  constructor(value: Status) {
    this.value = value;
  }

  static fromString(value: string): TennisCourtFrameStatus {
    if (!STATUSES.includes(value as Status)) {
      throw new UnknownStatusError();
    }

    return new TennisCourtFrameStatus(value as Status);
  }

  toString(): Status {
    return this.value;
  }

  isEqual(other: TennisCourtFrameStatus) {
    return this.value === other.value;
  }
}

export default TennisCourtFrameStatus;
