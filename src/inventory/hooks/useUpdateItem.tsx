import { MutateFunction, queryCache, useMutation } from 'react-query'

import InventoryRepository from '../../shared/db/InventoryRepository'
import InventoryItem from '../../shared/model/InventoryItem'
import validateItem, { InventoryItemError } from '../add/validate-inventory-item'

interface updateItemResult {
  mutate: MutateFunction<InventoryItem, unknown, InventoryItem, unknown>
  isLoading: boolean
  isError: boolean
  error: InventoryItemError
}

async function updateItem(item: InventoryItem): Promise<InventoryItem> {
  return InventoryRepository.saveOrUpdate(item)
}

export default function useUpdateItem(item: InventoryItem): updateItemResult {
  const updateItemError = validateItem(item)
  const [mutate, { isLoading, isError }] = useMutation(updateItem, {
    onSuccess: async () => {
      await queryCache.invalidateQueries('item')
    },
    throwOnError: true,
  })
  const result: updateItemResult = {
    mutate,
    isLoading,
    isError,
    error: updateItemError,
  }
  return result
}
