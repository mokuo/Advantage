import CollectionRepository from "../CollectionRepository"
import Collection from "@src/domain/models/Collection"
import CollectionId from "@src/domain/models/CollectionId"
import FacilityName from "@src/domain/models/FacilityName"
import TennisCourt from "@src/domain/models/TennisCourt"
import TennisCourtId from "@src/domain/models/TennisCourtId"
import TennisCourtName from "@src/domain/models/TennisCourtName"
import TennisCourtStatus from "@src/domain/models/TennisCourtStatus"
import UsageTime from "@src/domain/models/UsageTime"

jest.setTimeout(30000)

describe("CollectionRepository", () => {
  describe("#save", () => {
    it("Collection の集約を保存できる", async () => {
      const tennisCourt = new TennisCourt(
        TennisCourtId.build(),
        new FacilityName("itabashi"),
        new TennisCourtName("テニスコートの名前"),
        new UsageTime(new Date(2021, 12 - 1, 9, 11), new Date(2021, 12 - 1, 9, 13)),
        new TennisCourtStatus("available")
      )
      const collectionId = CollectionId.build()
      const collectedAt = new Date()
      const collection = new Collection(
        collectionId,
        [tennisCourt],
        collectedAt
      )

      const repo = new CollectionRepository()
      await repo.save(collection)

      const foundCollection = await repo.find(collectionId)
      expect(foundCollection?.id.isEqual(collectionId)).toBeTruthy()
      expect(foundCollection?.tennisCourts[0].isEqual(tennisCourt)).toBeTruthy()
      expect(foundCollection?.collectedAt).toEqual(collectedAt)
    })
  })

  describe("#find", () => {})
})
