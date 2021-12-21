import BaseReservationSystemRepository from "../BaseReservationSystemRepository";
import IOrganizationRepository from "@src/domain/models/IOrganizationRepository";
import Facility from "@src/domain/models/Organizations/Facility";
import FacilityId from "@src/domain/models/Organizations/FacilityId";
import FacilityName from "@src/domain/models/Organizations/FacilityName";
import Organization from "@src/domain/models/Organizations/Organization";
import OrganizationId from "@src/domain/models/Organizations/OrganizationId";
import OrganizationName from "@src/domain/models/Organizations/OrganizationName";

const ORGANIZATIONS: Organization[] = [
  new Organization(
    new OrganizationId("df0748f8-d762-493c-87be-22 744a23878e"),
    new OrganizationName("板橋区"),
    [
      new Facility(
        new FacilityId("4e2e3db5-b57d-4a24-8b95-26a4cea81f2a"),
        new FacilityName("東板橋庭球場")
      )
    ]
  )
]

class OrganizationRepository extends BaseReservationSystemRepository implements IOrganizationRepository {

  // TODO: エラーなく初期化できることをテストする
  async all() {
    return ORGANIZATIONS
  }
}

export default OrganizationRepository
