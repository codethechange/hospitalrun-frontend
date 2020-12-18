import InventoryFilter from '../../inventory/InventoryFilter'
import { relationalDb } from '../config/pouchdb'
import InventoryItem from '../model/InventoryItem'
import Repository from './Repository'

interface SearchOptions {
  status: InventoryFilter
}
class InventoryRepository extends Repository<InventoryItem> {
  constructor() {
    super('inventory', relationalDb)
  }

  async search(options: SearchOptions): Promise<InventoryItem[]> {
    return super.search(InventoryRepository.getSearchCriteria(options))
  }

  private static getSearchCriteria(options: SearchOptions): any {
    const statusFilter =
      options.status !== InventoryFilter.all ? [{ 'data.status': options.status }] : []
    const selector = {
      $and: statusFilter,
    }
    return {
      selector,
    }
  }
}

export default new InventoryRepository()
