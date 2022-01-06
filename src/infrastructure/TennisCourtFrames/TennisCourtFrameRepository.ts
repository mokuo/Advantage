import { Timestamp } from "@google-cloud/firestore";
import FirestoreDatabase from "../FirestoreDatabase";
import FacilityId from "@src/domain/models/Organizations/FacilityId";
import ITennisCourtFrameRepository from "@src/domain/models/TennisCourtFrames/ITennisCourtFrameRepository";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";
import TennisCourtFrameId from "@src/domain/models/TennisCourtFrames/TennisCourtFrameId";
import TennisCourtFrameStatus from "@src/domain/models/TennisCourtFrames/TennisCourtFrameStatus";
import TennisCourtName from "@src/domain/models/TennisCourtFrames/TennisCourtName";
import UsageTime from "@src/domain/models/TennisCourtFrames/UsageTime";

class UndefinedIdError extends Error {}

const COLLECTION_NAME = "tennis-court-frames";

type TennisCourtFrameWriteData = {
  facilityId: string;
  name: string;
  startTime: Date;
  endTime: Date;
  status: string;
};
type TennisCourtFrameReadData = TennisCourtFrameWriteData & {
  startTime: Timestamp;
  endTime: Timestamp;
};

class TennisCourtFrameRepository implements ITennisCourtFrameRepository {
  private db: FirestoreDatabase;

  constructor(db: FirestoreDatabase) {
    this.db = db;
  }

  async find(id: TennisCourtFrameId) {
    const docRef = this.getDocRef(id);
    const docSnapshot = await this.db.get(docRef);
    const data = docSnapshot.data() as TennisCourtFrameReadData | undefined;

    return (
      data &&
      new TennisCourtFrame(
        new FacilityId(data.facilityId),
        new TennisCourtName(data.name),
        // ref: https://googleapis.dev/nodejs/firestore/latest/Timestamp.html#toDate
        new UsageTime(data.startTime.toDate(), data.endTime.toDate()),
        TennisCourtFrameStatus.fromString(data.status),
        new TennisCourtFrameId(docSnapshot.id)
      )
    );
  }

  async save(frame: TennisCourtFrame) {
    if (frame.id === undefined) {
      throw new UndefinedIdError();
    }

    const docRef = this.getDocRef(frame.id);
    const data: TennisCourtFrameWriteData = {
      facilityId: frame.facilityId.toString(),
      name: frame.name.toString(),
      startTime: frame.usageTime.getStartTime(),
      endTime: frame.usageTime.getEndTime(),
      status: frame.status.toString(),
    };
    await this.db.set(docRef, data);
  }

  async delete(id: TennisCourtFrameId) {
    const docRef = this.getDocRef(id);
    await this.db.delete(docRef);
  }

  async all() {
    const colRef = this.getColRef();
    const querySnapshot = await this.db.getAll(colRef);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as TennisCourtFrameReadData;
      return new TennisCourtFrame(
        new FacilityId(data.facilityId),
        new TennisCourtName(data.name),
        // ref: https://googleapis.dev/nodejs/firestore/latest/Timestamp.html#toDate
        new UsageTime(data.startTime.toDate(), data.endTime.toDate()),
        TennisCourtFrameStatus.fromString(data.status),
        new TennisCourtFrameId(doc.id)
      );
    });
  }

  private getColRef(): FirebaseFirestore.CollectionReference {
    return this.db.collection(COLLECTION_NAME);
  }

  private getDocRef(id: TennisCourtFrameId): FirebaseFirestore.DocumentReference {
    return this.db.collection(COLLECTION_NAME).doc(id.toString());
  }
}

export default TennisCourtFrameRepository;
