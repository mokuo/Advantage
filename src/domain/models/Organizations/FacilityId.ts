import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import IValueObject from "../IValueObject";

class NotUuidError extends Error {}

class FacilityId implements IValueObject {
  private value: string;

  constructor(value: string) {
    const isUuid = uuidValidate(value);
    if (!isUuid) {
      throw new NotUuidError();
    }

    this.value = value;
  }

  static build(): FacilityId {
    return new FacilityId(uuidv4());
  }

  toString(): string {
    return this.value;
  }

  isEqual(other: FacilityId) {
    return this.value === other.value;
  }
}

export default FacilityId;
