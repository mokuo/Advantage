import FacilityName from "./FacilityName";
import TennisCourtId from "./TennisCourtId";
import TennisCourtName from "./TennisCourtName";
import TennisCourtStatus from "./TennisCourtStatus";
import UsageTime from "./UsageTime"

class InvalidValueError extends Error {}

class TennisCourt {
  private facilityName: FacilityName

  private name: TennisCourtName

  private usageTime: UsageTime

  private status: TennisCourtStatus

  private id?: TennisCourtId

  constructor(
    facilityName: FacilityName,
    name: TennisCourtName,
    usageTime: UsageTime,
    status: TennisCourtStatus,
    id?: TennisCourtId
  ) {
    this.facilityName = facilityName
    this.name = name
    this.usageTime = usageTime
    this.status = status
    this.id = id
  }

  isEqual(other: TennisCourt): boolean {
    if (this.id === undefined || other.id === undefined) {
      throw new InvalidValueError()
    }

    return this.facilityName.isEqual(other.facilityName) &&
      this.name.isEqual(other.name) &&
      this.usageTime.isEqual(other.usageTime) &&
      this.status.isEqual(other.status) &&
      this.id.isEqual(other.id)
  }

  isSameTennisCourt(other: TennisCourt): boolean {
    return this.facilityName.isEqual(other.facilityName) &&
      this.name.isEqual(other.name) &&
      this.usageTime.isEqual(other.usageTime)
  }
}

export default TennisCourt;
