import IValueObject from "./IValueObject";

class CollectionId implements IValueObject {
  private value: string

  constructor(value: string) {
    // TODO: UUID であることを検証する
    this.value = value
  }

  public toString(): string {
    return this.value
  }

  isEqual(other: CollectionId) {
    return this.value === other.value
  }
}

export default CollectionId
