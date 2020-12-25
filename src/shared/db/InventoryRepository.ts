import InventoryFilter from '../../inventory/InventoryFilter'
import { relationalDb } from '../config/pouchdb'
import InventoryItem from '../model/InventoryItem'
import Repository from './Repository'

interface SearchOptions {
  type: InventoryFilter
}
class InventoryRepository extends Repository<InventoryItem> {
  constructor() {
    super('inventory', relationalDb)
  }

  async search(options: SearchOptions): Promise<InventoryItem[]> {
    return super.search(InventoryRepository.getSearchCriteria(options))
  }

  private static getSearchCriteria(options: SearchOptions): any {
    const typeFilter = options.type !== InventoryFilter.all ? [{ 'data.type': options.type }] : []
    const selector = {
      $and: typeFilter,
    }
    return {
      selector,
    }
  }
}

export default new InventoryRepository()
