import { DocumentData, DocumentReference, WriteBatch, WriteResult } from "@google-cloud/firestore";

class FirestoreBatch {
  private batch: WriteBatch

  constructor(batch: WriteBatch) {
    this.batch = batch
  }

  async set(docRef: DocumentReference, data: DocumentData): Promise<void> {
    this.batch.set(docRef, data)
    return Promise.resolve()
  }
}

export default FirestoreBatch
