import FacilityName from "./FacilityName";
import TennisCourtId from "./TennisCourtId";
import TennisCourtName from "./TennisCourtName";
import TennisCourtStatus from "./TennisCourtStatus";
import UsageTime from "./UsageTime"

class TennisCourt {
  id: TennisCourtId

  facilityName: FacilityName

  name: TennisCourtName

  usageTime: UsageTime

  status: TennisCourtStatus

  constructor(
    id: TennisCourtId,
    facilityName: FacilityName,
    name: TennisCourtName,
    usageTime: UsageTime,
    status: TennisCourtStatus
  ) {
    this.id = id
    this.facilityName = facilityName
    this.name = name
    this.usageTime = usageTime
    this.status = status
  }

  isEqual(other: TennisCourt): boolean {
    return this.id.isEqual(other.id) &&
      this.facilityName.isEqual(other.facilityName) &&
      this.name.isEqual(other.name) &&
      this.usageTime.isEqual(other.usageTime) &&
      this.status.isEqual(other.status)
  }

  isSameTennisCourt(other: TennisCourt): boolean {
    return this.facilityName.isEqual(other.facilityName) &&
      this.name.isEqual(other.name) &&
      this.usageTime.isEqual(other.usageTime)
  }
}

export default TennisCourt;
