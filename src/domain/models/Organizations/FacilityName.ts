import IValueObject from "../IValueObject";

class UnknownFacilityNameError extends Error {}

// ref: https://dackdive.hateblo.jp/entry/2019/08/13/090000
const FACILITY_NAMES = ["東板橋庭球場"] as const;
type FacilityNameValue = typeof FACILITY_NAMES[number];

class FacilityName implements IValueObject {
  private value: FacilityNameValue;

  constructor(value: FacilityNameValue) {
    this.value = value;
  }

  static fromString(value: string): FacilityName {
    if (!FACILITY_NAMES.includes(value as FacilityNameValue)) {
      throw new UnknownFacilityNameError();
    }

    return new FacilityName(value as FacilityNameValue);
  }

  toString(): FacilityNameValue {
    return this.value;
  }

  isEqual(other: FacilityName) {
    return this.value === other.value;
  }
}

export default FacilityName;
