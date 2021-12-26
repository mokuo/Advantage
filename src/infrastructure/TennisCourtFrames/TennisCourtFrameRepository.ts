import FirestoreDatabase from "../FirestoreDatabase";
import FacilityId from "@src/domain/models/Organizations/FacilityId";
import TennisCourtFrame from "@src/domain/models/TennisCourtFrames/TennisCourtFrame";
import TennisCourtFrameId from "@src/domain/models/TennisCourtFrames/TennisCourtFrameId";
import TennisCourtFrameStatus from "@src/domain/models/TennisCourtFrames/TennisCourtFrameStatus";
import TennisCourtName from "@src/domain/models/TennisCourtFrames/TennisCourtName";
import UsageTime from "@src/domain/models/TennisCourtFrames/UsageTime";

const COLLECTION_NAME = "tennis-court-frames";

type TennisCourtFrameData = {
  facilityId: string;
  name: string;
  startTime: Date;
  endTime: Date;
  status: string;
};

class TennisCourtFrameRepository {
  private db: FirestoreDatabase;

  constructor(db: FirestoreDatabase) {
    this.db = db;
  }

  async find(id: TennisCourtFrameId) {
    const docRef = this.getDocRef(id);
    const docSnapshot = await this.db.get(docRef);
    const data = docSnapshot.data();

    return (
      data &&
      new TennisCourtFrame(
        new TennisCourtFrameId(docSnapshot.id),
        new FacilityId(data.facilityId),
        new TennisCourtName(data.name),
        new UsageTime(data.startDate, data.endDate),
        new TennisCourtFrameStatus(data.status)
      )
    );
  }

  async save(frame: TennisCourtFrame) {
    const docRef = this.getDocRef(frame.id);

    const data: TennisCourtFrameData = {
      facilityId: frame.facilityId.toString(),
      name: frame.name.toString(),
      startTime: frame.usageTime.getStartTime(),
      endTime: frame.usageTime.getEndTime(),
      status: frame.status.toString(),
    };

    await this.db.set(docRef, data);
  }

  private getDocRef(id: TennisCourtFrameId): FirebaseFirestore.DocumentReference {
    return this.db.collection(COLLECTION_NAME).doc(id.toString());
  }
}

export default TennisCourtFrameRepository;
