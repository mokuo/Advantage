import { DocumentData, DocumentReference, WriteResult } from "@google-cloud/firestore";

class UnknownOperationError extends Error{}

type Operation = "normal" | "transaction" | "batch"

class FirestoreDatabase {
  private operation: Operation

  constructor(operation: Operation) {
    this.operation = operation
  }

  async set(docRef: DocumentReference, data: DocumentData): Promise<WriteResult> {
    switch (this.operation) {
      case "normal":
        return this.setNormal(docRef, data)
      case "transaction":
        return this.setNormal(docRef, data)
      case "batch":
        return this.setNormal(docRef, data)
      default:
        throw new UnknownOperationError()
    }
  }

  private async setNormal(docRef: DocumentReference, data: DocumentData): Promise<WriteResult> {
    return docRef.set(data)
  }

  private async setTransaction(docRef: DocumentReference, data: DocumentData): Promise<WriteResult> {
    return docRef.set(data)
  }

  private async setBatch(docRef: DocumentReference, data: DocumentData): Promise<WriteResult> {
    return docRef.set(data)
  }
}

export default FirestoreDatabase
