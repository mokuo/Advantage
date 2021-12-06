import { CollectionReference, DocumentData, DocumentReference, DocumentSnapshot, QuerySnapshot, Transaction, WriteResult } from "@google-cloud/firestore";
import IFirestoreDatabase from "./IFirestoreDatabase";

class FirestoreTransaction implements IFirestoreDatabase {
  private transaction: Transaction

  constructor(transaction: Transaction) {
    this.transaction = transaction
  }

  async set(docRef: DocumentReference, data: DocumentData): Promise<void> {
    this.transaction.set(docRef, data)
    return Promise.resolve()
  }

  async get(docRef: DocumentReference): Promise<DocumentSnapshot> {
    return this.transaction.get(docRef)
  }

  async getAll(colRef: CollectionReference): Promise<QuerySnapshot> {
    return this.transaction.get(colRef)
  }
}

export default FirestoreTransaction
