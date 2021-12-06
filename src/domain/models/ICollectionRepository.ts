import Collection from "./Collection";
import CollectionId from "./CollectionId";

interface ICollectionRepository {
  save: (collection: Collection) => Promise<void>
  find: (collectionId: CollectionId) => Promise<Collection | undefined>
}

export default ICollectionRepository
