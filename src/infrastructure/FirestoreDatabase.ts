import { CollectionReference, DocumentData, DocumentReference, DocumentSnapshot, QuerySnapshot, WriteResult } from "@google-cloud/firestore";
import IFirestoreDatabase from "./IFirestoreDatabase";

class FirestoreDatabase implements IFirestoreDatabase {
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

export default FirestoreDatabase
