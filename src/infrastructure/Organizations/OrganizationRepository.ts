import Facility from "src/domain/models/Organizations/Facility";
import FacilityId from "src/domain/models/Organizations/FacilityId";
import FacilityName from "src/domain/models/Organizations/FacilityName";
import IOrganizationRepository from "src/domain/models/Organizations/IOrganizationRepository";
import Organization from "src/domain/models/Organizations/Organization";
import OrganizationId from "src/domain/models/Organizations/OrganizationId";
import OrganizationName from "src/domain/models/Organizations/OrganizationName";

export const ORGANIZATIONS: Organization[] = [
  new Organization(new OrganizationId("df0748f8-d762-493c-87be-22744a23878e"), new OrganizationName("板橋区"), [
    new Facility(new FacilityId("4e2e3db5-b57d-4a24-8b95-26a4cea81f2a"), new FacilityName("東板橋庭球場")),
  ]),
];

class OrganizationRepository implements IOrganizationRepository {
  // TODO: エラーなく初期化できることをテストする
  async all() {
    return ORGANIZATIONS;
  }

  async findById(id: OrganizationId) {
    return ORGANIZATIONS.find((org) => org.id.isEqual(id));
  }

  async findByName(name: OrganizationName) {
    return ORGANIZATIONS.find((org) => org.name.isEqual(name));
  }
}

export default OrganizationRepository;
