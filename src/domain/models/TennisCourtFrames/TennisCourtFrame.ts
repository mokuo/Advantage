import FacilityId from "../Organizations/FacilityId";
import TennisCourtFrameId from "./TennisCourtFrameId";
import TennisCourtFrameStatus from "./TennisCourtFrameStatus";
import TennisCourtName from "./TennisCourtName";
import UsageTime from "./UsageTime";

class TennisCourtFrame {
  id: TennisCourtFrameId;

  facilityId: FacilityId;

  name: TennisCourtName;

  usageTime: UsageTime;

  status: TennisCourtFrameStatus;

  constructor(
    id: TennisCourtFrameId,
    facilityId: FacilityId,
    name: TennisCourtName,
    usageTime: UsageTime,
    status: TennisCourtFrameStatus
  ) {
    this.id = id;
    this.facilityId = facilityId;
    this.name = name;
    this.usageTime = usageTime;
    this.status = status;
  }

  isEqual(other: TennisCourtFrame): boolean {
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
}

export default TennisCourtFrame;
