import FacilityId from "../Organizations/FacilityId";
import TennisCourtId from "./TennisCourtId";
import TennisCourtName from "./TennisCourtName";
import TennisCourtStatus from "./TennisCourtStatus";
import UsageTime from "./UsageTime"

class TennisCourtFrame {
  id: TennisCourtId

  facilityId: FacilityId

  name: TennisCourtName

  usageTime: UsageTime

  status: TennisCourtStatus

  constructor(
    id: TennisCourtId,
    facilityId: FacilityId,
    name: TennisCourtName,
    usageTime: UsageTime,
    status: TennisCourtStatus
  ) {
    this.id = id
    this.facilityId = facilityId
    this.name = name
    this.usageTime = usageTime
    this.status = status
  }

  isEqual(other: TennisCourtFrame): boolean {
    return this.id.isEqual(other.id)
  }

  isSameFrame(other: TennisCourtFrame): boolean {
    return this.facilityId.isEqual(other.facilityId) &&
      this.name.isEqual(other.name) &&
      this.usageTime.isEqual(other.usageTime)
  }
}

export default TennisCourtFrame;
