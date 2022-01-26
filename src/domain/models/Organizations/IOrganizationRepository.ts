import Organization from "./Organization";
import OrganizationName from "./OrganizationName";

interface IORganizationRepository {
  all: () => Promise<Organization[]>;
  findByName: (name: OrganizationName) => Promise<Organization | undefined>;
}

export default IORganizationRepository;
