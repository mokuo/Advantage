import IValueObject from "../IValueObject";

class UnknownOrganizationNameError extends Error{}

// ref: https://dackdive.hateblo.jp/entry/2019/08/13/090000
const ORGANIZATION_NAMES = ["板橋区"] as const
type OrganizationNameValue = typeof ORGANIZATION_NAMES[number]

class OrganizationName implements IValueObject {
  private value: OrganizationNameValue

  constructor(value: OrganizationNameValue) {
    this.value = value
  }

  static fromString(value: string): OrganizationName {
    if (!ORGANIZATION_NAMES.includes(value as OrganizationNameValue)) {
      throw new UnknownOrganizationNameError()
    }

    return new OrganizationName(value as OrganizationNameValue)
  }

  toString(): OrganizationNameValue {
    return this.value
  }

  isEqual(other: OrganizationName) {
    return this.value === other.value
  }
}

export default OrganizationName
