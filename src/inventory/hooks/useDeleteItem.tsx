import { queryCache, useMutation } from 'react-query'

import InventoryRepository from '../../shared/db/InventoryRepository'
import InventoryItem from '../../shared/model/InventoryItem'

interface deleteItemRequest {
  itemId: string
}

async function deleteItem(request: deleteItemRequest): Promise<InventoryItem> {
  const item = await InventoryRepository.find(request.itemId)
  return InventoryRepository.delete(item)
}

export default function useDeleteItem() {
  return useMutation(deleteItem, {
    onSuccess: async () => {
      await queryCache.invalidateQueries('item')
    },
  })
}
