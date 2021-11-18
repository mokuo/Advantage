import IValueObject from "./IValueObject";

type FacilityNameValue = "itabashi"

class FacilityName implements IValueObject {
  private value: FacilityNameValue

  constructor(value: FacilityNameValue) {
    this.value = value
  }

  public toString(): FacilityNameValue {
    return this.value
  }

  isEqual(other: FacilityName) {
    return this.value === other.value
  }
}

export default FacilityName
