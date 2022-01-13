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
import { credentials } from "@grpc/grpc-js";

class UnknownOperationTypeError extends Error {}
class WriteOnlyError extends Error {}

type FirestoreOperation =
  | { type: "normal" }
  | { type: "transaction"; transaction: Transaction }
  | { type: "batch"; batch: WriteBatch };
type Callback = (db: FirestoreDatabase) => Promise<void>;

const initializeFirestore = (): Firestore => {
  if (process.env.NODE_ENV === "test") {
    // ref: https://github.com/googleapis/nodejs-firestore/issues/674
    // ref: https://github.com/firebase/firebase-admin-node/issues/472
    return new Firestore({
      projectId: "test-project",
      port: Number(process.env.DB_PORT),
      servicePath: "localhost",
      sslCreds: credentials.createInsecure(),
    });
  }

  return new Firestore();
};

class FirestoreDatabase {
  public firestore: Firestore;

  private operation: FirestoreOperation;

  constructor(firestore: Firestore = initializeFirestore(), operation: FirestoreOperation = { type: "normal" }) {
    this.firestore = firestore;
    this.operation = operation;
  }

  static async runTransaction(callback: Callback): Promise<void> {
    const firestore = initializeFirestore();
    await firestore.runTransaction<void>(async (transaction) => {
      const operation = new FirestoreDatabase(firestore, { type: "transaction", transaction });
      await callback(operation);
    });
  }

  static async runBatch(callback: Callback): Promise<void> {
    const firestore = initializeFirestore();
    const batch = firestore.batch();
    const operation = new FirestoreDatabase(firestore, { type: "batch", batch });
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

  async delete(docRef: DocumentReference): Promise<void> {
    switch (this.operation.type) {
      case "normal":
        await docRef.delete();
        break;
      case "transaction":
        this.operation.transaction.delete(docRef);
        break;
      case "batch":
        this.operation.batch.delete(docRef);
        break;
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
