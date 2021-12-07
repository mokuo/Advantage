import { Firestore } from "@google-cloud/firestore";
import FirestoreBatch from "./firestore/FirestoreBatch";
import FirestoreTransaction from "./firestore/FirestoreTransaction";
import IFirestoreOperation from "./firestore/IFirestoreOperation";

type Callback = (db: IFirestoreOperation) => Promise<void>

class FirestoreDatabase {
  async runTransaction(callback: Callback): Promise<void> {
    const firestore = new Firestore()
    await firestore.runTransaction<void>(async t => {
      const operation = new FirestoreTransaction(t)
      await callback(operation)
    })
  }

  async runBatch(callback: Callback): Promise<void> {
    const firestore = new Firestore()
    const batch = firestore.batch()
    const operation = new FirestoreBatch(batch)
    await callback(operation)
    await batch.commit()
  }
}

export default FirestoreDatabase
