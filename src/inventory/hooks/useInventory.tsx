import { useQuery } from 'react-query'

import InventoryRepository from '../../shared/db/InventoryRepository'
import InventoryItem from '../../shared/model/InventoryItem'
import InventorySearchRequest from '../model/InventorySearchRequest'

function fetchInventory(
  _: string,
  searchRequest: InventorySearchRequest,
): Promise<InventoryItem[]> {
  return InventoryRepository.search(searchRequest)
}

export default function useInventory(searchRequest: InventorySearchRequest) {
  return useQuery(['inventory', searchRequest], fetchInventory)
}
