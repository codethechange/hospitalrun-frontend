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

  async search(options: SearchOptions): Promise<InventoryItem[]> {
    const searchValue = { $regex: RegExp(options.text, 'i') }
    const typeFilter = options.type !== 'all' ? [{ 'data.type': options.type }] : []
    const selector = {
      $and: [
        {
          'data.name': searchValue,
        },
        typeFilter,
      ],
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
