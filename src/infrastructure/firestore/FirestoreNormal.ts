import { CollectionReference, DocumentData, DocumentReference, DocumentSnapshot, Firestore, QuerySnapshot } from "@google-cloud/firestore";

class FirestoreNormal {
  firestore: Firestore

  constructor(firestore: Firestore = new Firestore()) {
    this.firestore = firestore
  }

  async set(docRef: DocumentReference, data: DocumentData): Promise<void> {
    await docRef.set(data)
  }

  async get(docRef: DocumentReference): Promise<DocumentSnapshot> {
    return docRef.get()
  }

  async getAll(colRef: CollectionReference): Promise<QuerySnapshot> {
    return colRef.get()
  }
}

export default FirestoreNormal
