import IValueObject from "../IValueObject";

class TennisCourtName implements IValueObject {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  isEqual(other: TennisCourtName) {
    return this.value === other.value;
  }
}

export default TennisCourtName;
