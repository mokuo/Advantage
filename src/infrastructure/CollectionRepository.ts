import { Firestore } from "@google-cloud/firestore";
import FirestoreDatabase from "./FirestoreDatabase";
import IFirestoreDatabase from "./IFirestoreDatabase";
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
  async save(collection: Collection, firestore: IFirestoreDatabase = new FirestoreDatabase()): Promise<void> {
    const db = new Firestore()
    // TODO: トランザクション
    //       Transaction か WriteBatch を受け取り、それを使えるようにする
    const collectionData: CollectionData = {
      collectedAt: collection.collectedAt
    }

    const docRef = db.collection(COLLECTION_NAME)
                      .doc(collection.id.toString())
    await firestore.set(docRef, collectionData)

    await Promise.all(
      collection.tennisCourts.map(async (tennisCourt) => {
        const tennisCourtData: TennisCourtData = {
          facilityName: tennisCourt.facilityName.toString(),
          name: tennisCourt.name.toString(),
          startTime: tennisCourt.usageTime.getStartTime(),
          endTime: tennisCourt.usageTime.getEndTime(),
          status: tennisCourt.status.toString()
        }

        await docRef.collection(SUB_COLLECTION_NAME)
                    .doc(tennisCourt.id.toString())
                    .set(tennisCourtData)
      })
    )
  }

  async find(collectionId: CollectionId): Promise<Collection | undefined> {
    // TODO: トランザクション
    //       Transaction を渡された場合、それを使ってデータを取り出すようにする
    const db = new Firestore()
    const docRef = db.collection(COLLECTION_NAME)
                   .doc(collectionId.toString())
    const docSnapshot = await docRef.get()
    
    if (docSnapshot.exists) {
      const docData = docSnapshot.data()
      const docData2 = await docRef.collection(SUB_COLLECTION_NAME)
                             .get()
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
