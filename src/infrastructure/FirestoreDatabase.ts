import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  QuerySnapshot,
  Transaction,
  WriteBatch,
} from "@google-cloud/firestore";

class UnknownOperationTypeError extends Error {}
class WriteOnlyError extends Error {}

type FirestoreOperation =
  | { type: "normal" }
  | { type: "transaction"; transaction: Transaction }
  | { type: "batch"; batch: WriteBatch };
type Callback = (db: FirestoreDatabase) => Promise<void>;

const initializeFirestore = (): Firestore => {
  if (process.env.NODE_ENV === "test") {
    return new Firestore({ projectId: "test-project" });
  }

  return new Firestore();
};

class FirestoreDatabase {
  public firestore: Firestore;

  private operation: FirestoreOperation;

  constructor(operation: FirestoreOperation = { type: "normal" }) {
    this.operation = operation;
    this.firestore = initializeFirestore();
  }

  static async runTransaction(callback: Callback): Promise<void> {
    const firestore = new Firestore();
    await firestore.runTransaction<void>(async (transaction) => {
      const operation = new FirestoreDatabase({ type: "transaction", transaction });
      await callback(operation);
    });
  }

  static async runBatch(callback: Callback): Promise<void> {
    const firestore = new Firestore();
    const batch = firestore.batch();
    const operation = new FirestoreDatabase({ type: "batch", batch });
    await callback(operation);
    await batch.commit();
  }

  collection(collectionPath: string) {
    return this.firestore.collection(collectionPath);
  }

  async set(docRef: DocumentReference, data: DocumentData): Promise<void> {
    switch (this.operation.type) {
      case "normal":
        await docRef.set(data);
        break;
      case "transaction":
        this.operation.transaction.set(docRef, data);
        break;
      case "batch":
        this.operation.batch.set(docRef, data);
        break;
      default:
        throw new UnknownOperationTypeError();
    }
  }

  async get(docRef: DocumentReference): Promise<DocumentSnapshot> {
    switch (this.operation.type) {
      case "normal":
        return docRef.get();
      case "transaction":
        return this.operation.transaction.get(docRef);
      case "batch":
        throw new WriteOnlyError();
      default:
        throw new UnknownOperationTypeError();
    }
  }

  async getAll(colRef: CollectionReference): Promise<QuerySnapshot> {
    switch (this.operation.type) {
      case "normal":
        return colRef.get();
      case "transaction":
        return this.operation.transaction.get(colRef);
      case "batch":
        throw new WriteOnlyError();
      default:
        throw new UnknownOperationTypeError();
    }
  }
}

export default FirestoreDatabase;
