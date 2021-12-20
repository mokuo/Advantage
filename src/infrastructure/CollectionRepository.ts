import FirestoreDatabase from "./FirestoreDatabase";
import Collection from "@src/domain/models/Collection";
import CollectionId from "@src/domain/models/CollectionId";
import FacilityName from "@src/domain/models/FacilityName";
import ICollectionRepository from "@src/domain/models/ICollectionRepository";
import TennisCourt from "@src/domain/models/TennisCourt";
import TennisCourtId from "@src/domain/models/TennisCourtId";
import TennisCourtName from "@src/domain/models/TennisCourtName";
import TennisCourtStatus from "@src/domain/models/TennisCourtStatus";
import UsageTime from "@src/domain/models/UsageTime";

const COLLECTION_NAME = "collections"
const SUB_COLLECTION_NAME = "tennis-courts"

type CollectionData = {
  collectedAt: Date
}
type TennisCourtData = {
  facilityName: string
  name: string
  startTime: Date
  endTime: Date
  status: string
}

class CollectionRepository implements ICollectionRepository {
  private db: FirestoreDatabase
  
  constructor(db = new FirestoreDatabase()) {
    this.db = db
  }

  async save(collection: Collection): Promise<void> {
    const collectionData: CollectionData = {
      collectedAt: collection.collectedAt
    }
    const collectionRef = this.db.collection(COLLECTION_NAME)
                      .doc(collection.id.toString())
    await this.db.set(collectionRef, collectionData)

    await Promise.all(
      collection.tennisCourts.map(async (tennisCourt) => {
        const tennisCourtData: TennisCourtData = {
          facilityName: tennisCourt.facilityName.toString(),
          name: tennisCourt.name.toString(),
          startTime: tennisCourt.usageTime.getStartTime(),
          endTime: tennisCourt.usageTime.getEndTime(),
          status: tennisCourt.status.toString()
        }

        const tennisCourtRef = collectionRef.collection(SUB_COLLECTION_NAME)
                                            .doc(tennisCourt.id.toString())
        await this.db.set(tennisCourtRef, tennisCourtData)
      })
    )
  }

  async find(collectionId: CollectionId): Promise<Collection | undefined> {
    const collectionRef = this.db.collection(COLLECTION_NAME)
                   .doc(collectionId.toString())
    const collectionSnapshot = await this.db.get(collectionRef)
    const collectionData = collectionSnapshot.data()
    if (collectionData === undefined) {
      return undefined
    }

    const tennisCourtQuerySnapshot = await this.db.getAll(collectionRef.collection(SUB_COLLECTION_NAME))
    const tennisCourts: TennisCourt[] = tennisCourtQuerySnapshot.docs.map(doc => {
      const tennisCourtData = doc.data() as TennisCourtData

      return new TennisCourt(
        new TennisCourtId(doc.id),
        FacilityName.fromString(tennisCourtData.facilityName),
        new TennisCourtName(tennisCourtData.name),
        new UsageTime(tennisCourtData.startTime, tennisCourtData.endTime),
        TennisCourtStatus.fromString(tennisCourtData.status)
      )
    })

    return new Collection(
      new CollectionId(collectionSnapshot.id),
      tennisCourts,
      collectionData.collectedAt
    )
  }
}

export default CollectionRepository
