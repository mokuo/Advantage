import Facility from "./Facility";
import FacilityName from "./FacilityName";
import OrganizationId from "./OrganizationId";
import OrganizationName from "./OrganizationName";

class Organization {
  id: OrganizationId

  name: OrganizationName

  facilities: Facility[]

  constructor(id: OrganizationId, name: OrganizationName, facilities: Facility[]) {
    this.id = id
    this.name = name
    this.facilities = facilities
  }

  findFacilityByName(name: FacilityName): Facility | undefined {
    return this.facilities.find(facility => facility.name.isEqual(name))
  }
}

export default Organization
