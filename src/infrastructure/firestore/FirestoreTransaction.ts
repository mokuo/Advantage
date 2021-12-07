import { CollectionReference, DocumentData, DocumentReference, DocumentSnapshot, QuerySnapshot, Transaction } from "@google-cloud/firestore";

class FirestoreTransaction {
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
