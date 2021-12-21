import FacilityId from "./FacilityId";
import FacilityName from "./FacilityName"

class Facility {
  id: FacilityId

  name: FacilityName

  constructor(id: FacilityId, name: FacilityName) {
    this.id = id 
    this.name = name
  }
}

export default Facility
