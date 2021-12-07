import { Firestore } from "@google-cloud/firestore";
import FirestoreNormal from "./firestore/FirestoreNormal";
import IFirestoreOperation from "./firestore/IFirestoreOperation";
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
  private db: Firestore

  private operation: IFirestoreOperation

  constructor(operation: IFirestoreOperation = new FirestoreNormal()) {
    this.db = new Firestore()
    this.operation = operation
  }

  async save(collection: Collection): Promise<void> {
    const collectionData: CollectionData = {
      collectedAt: collection.collectedAt
    }
    const docRef = this.db.collection(COLLECTION_NAME)
                      .doc(collection.id.toString())
    await this.operation.set(docRef, collectionData)

    await Promise.all(
      collection.tennisCourts.map(async (tennisCourt) => {
        const tennisCourtData: TennisCourtData = {
          facilityName: tennisCourt.facilityName.toString(),
          name: tennisCourt.name.toString(),
          startTime: tennisCourt.usageTime.getStartTime(),
          endTime: tennisCourt.usageTime.getEndTime(),
          status: tennisCourt.status.toString()
        }

        const docRef2 = docRef.collection(SUB_COLLECTION_NAME)
                              .doc(tennisCourt.id.toString())
        await this.operation.set(docRef2, tennisCourtData)
      })
    )
  }

  async find(collectionId: CollectionId): Promise<Collection | undefined> {
    // TODO: トランザクション
    //       Transaction を渡された場合、それを使ってデータを取り出すようにする
    const docRef = this.db.collection(COLLECTION_NAME)
                   .doc(collectionId.toString())
    const docSnapshot = await this.operation.get(docRef)
    
    if (docSnapshot.exists) {
      const docData = docSnapshot.data()
      const docData2 = await this.operation.getAll(docRef.collection(SUB_COLLECTION_NAME))
      const tennisCourts: TennisCourt[] = docData2.docs.map(doc => {
        const data = doc.data() as TennisCourtData

        return new TennisCourt(
          new TennisCourtId(doc.id),
          new FacilityName(data.facilityName),
          new TennisCourtName(data.name),
          new UsageTime(data.startTime, data.endTime),
          new TennisCourtStatus(data.status)
        )
      }),

      return new Collection({
        id: new CollectionId(docData.id),
        tennisCourts,
        collectedAt: docData.collectedAt
      })
    } 
      return undefined
    
  }
}

export default CollectionRepository
