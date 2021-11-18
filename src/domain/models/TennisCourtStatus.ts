import IValueObject from "./IValueObject";

type Status = "available" | "unavailable"

class TennisCourtStatus implements IValueObject {
  private value: Status

  constructor(value: Status) {
    this.value = value
  }

  public toString(): Status {
    return this.value
  }

  isEqual(other: TennisCourtStatus) {
    return this.value === other.value
  }
}

export default TennisCourtStatus
