import { useQuery } from 'react-query'

import InventoryRepository from '../../shared/db/InventoryRepository'
import InventoryItem from '../../shared/model/InventoryItem'

function fetchInventoryItemById(_: any, itemId: string): Promise<InventoryItem> {
  return InventoryRepository.find(itemId)
}

export default function useItem(itemId: string) {
  return useQuery(['item', itemId], fetchInventoryItemById)
}
