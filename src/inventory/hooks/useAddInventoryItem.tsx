import { isEmpty } from 'lodash'
import { queryCache, useMutation } from 'react-query'
import shortid from 'shortid'

import InventoryRepository from '../../shared/db/InventoryRepository'
import InventoryItem from '../../shared/model/InventoryItem'
import validateItem from '../add/validate-inventory-item'

const getItemID = (): string => `I-${shortid.generate()}`

export function addInventoryItem(item: InventoryItem): Promise<InventoryItem> {
  const error = validateItem(item)
  if (isEmpty(error)) {
    const updatedItem: InventoryItem = {
      ...item,
      id: getItemID(),
    }
    return InventoryRepository.save(updatedItem)
  }

  throw error
}

export default function useAddedItem() {
  return useMutation(addInventoryItem, {
    onSuccess: async () => {
      await queryCache.invalidateQueries('items')
    },
    throwOnError: true,
  })
}
