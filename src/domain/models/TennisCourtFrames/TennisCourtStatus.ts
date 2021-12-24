import IValueObject from "../IValueObject";

class UnknownStatusError extends Error{}

// ref: https://dackdive.hateblo.jp/entry/2019/08/13/090000
const STATUSES = ["available", "unavailable"] as const
type Status = typeof STATUSES[number]

class TennisCourtStatus implements IValueObject {
  private value: Status

  constructor(value: Status) {
    this.value = value
  }

  static fromString(value: string): TennisCourtStatus {
    if (!STATUSES.includes(value as Status)) {
      throw new UnknownStatusError()
    }

    return new TennisCourtStatus(value as Status)
  }

  toString(): Status {
    return this.value
  }

  isEqual(other: TennisCourtStatus) {
    return this.value === other.value
  }
}

export default TennisCourtStatus
