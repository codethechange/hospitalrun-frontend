import { ItemType } from '../../inventory/model/ItemType'
import { relationalDb } from '../config/pouchdb'
import InventoryItem from '../model/InventoryItem'
import Repository from './Repository'

interface SearchOptions {
  text: string
  type: ItemType
}

class InventoryRepository extends Repository<InventoryItem> {
  constructor() {
    super('inventory', relationalDb)
  }

  async search(container: SearchOptions): Promise<InventoryItem[]> {
    const searchValue = { $regex: RegExp(container.text, 'i') }
    const typeFilter = container.type !== 'all' ? [{ 'data.type': container.type }] : [undefined]
    const selector = {
      $and: [
        {
          $or: [
            {
              'data.name': searchValue,
            },
          ],
        },
        ...typeFilter,
      ].filter((x) => x !== undefined),
    }

    return super.search({
      selector,
    })
  }

  async save(entity: InventoryItem): Promise<InventoryItem> {
    return super.save(entity)
  }
}

export default new InventoryRepository()
