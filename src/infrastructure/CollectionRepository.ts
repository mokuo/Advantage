import { Firestore } from "@google-cloud/firestore";
import ICollectionRepository from "@src/domain/models/ICollectionRepository";

const COLLECTION_NAME = "collections"
const SUB_COLLECTION_NAME = "tennis_courts"

class CollectionRepository implements ICollectionRepository {
  async create(collection: Collection): Promise<void> {
    const db = new Firestore({})
    const res = await db.collection(COLLECTION_NAME).doc(collection.id).set({
      
    })
    // TODO: サブコレクションで tennis_courts を追加する？
  }
}
