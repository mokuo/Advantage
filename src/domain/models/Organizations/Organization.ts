import Facility from "./Facility";
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
}

export default Organization
