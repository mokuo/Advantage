import CollectionId from "./CollectionId";
import TennisCourt from "./TennisCourt";

class Collection {
  public id: CollectionId

  public tennisCourts: TennisCourt[]

  public collectedAt: Date

  constructor(
    id: CollectionId,
    tennisCourts: TennisCourt[],
    collectedAt: Date,
  ) {
    this.id = id
    this.tennisCourts = tennisCourts
    this.collectedAt = collectedAt
  }
}

export default Collection;
