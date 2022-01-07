import FacilityId from "../Organizations/FacilityId";
import TennisCourtFrameId from "./TennisCourtFrameId";
import TennisCourtFrameStatus from "./TennisCourtFrameStatus";
import TennisCourtName from "./TennisCourtName";
import UsageTime from "./UsageTime";

class IdAlreadyExistsError extends Error {}
class TennisCourtFrame {
  id?: TennisCourtFrameId;

  facilityId: FacilityId;

  name: TennisCourtName;

  usageTime: UsageTime;

  status: TennisCourtFrameStatus;

  constructor(
    facilityId: FacilityId,
    name: TennisCourtName,
    usageTime: UsageTime,
    status: TennisCourtFrameStatus,
    id?: TennisCourtFrameId
  ) {
    this.id = id;
    this.facilityId = facilityId;
    this.name = name;
    this.usageTime = usageTime;
    this.status = status;
  }

  isEqual(other: TennisCourtFrame): boolean {
    if (this.id === undefined || other.id === undefined) return false;

    return this.id.isEqual(other.id);
  }

  isSameFrame(other: TennisCourtFrame): boolean {
    return (
      this.facilityId.isEqual(other.facilityId) &&
      this.name.isEqual(other.name) &&
      this.usageTime.isEqual(other.usageTime)
    );
  }

  setStatus(status: TennisCourtFrameStatus) {
    this.status = status;
  }

  buildId() {
    if (this.id !== undefined) {
      throw new IdAlreadyExistsError();
    }

    this.id = TennisCourtFrameId.build();
  }
}

export default TennisCourtFrame;
