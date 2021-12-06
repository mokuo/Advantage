import { CollectionReference, DocumentData, DocumentReference, DocumentSnapshot, QuerySnapshot, WriteResult } from "@google-cloud/firestore";

interface IFirestoreDatabase {
  set(docRef: DocumentReference, data: DocumentData): Promise<void>
  get(docRef: DocumentReference): Promise<DocumentSnapshot>
  getAll(colRef: CollectionReference): Promise<QuerySnapshot>
}

export default IFirestoreDatabase
