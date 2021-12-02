import Collection from "./Collection";

interface ICollectionRepository {
  create: (collection: Collection) => Promise<void>
}

export default ICollectionRepository
