import useDeleteItem from '../../../inventory/hooks/useDeleteItem'
import InventoryRepository from '../../../shared/db/InventoryRepository'
import InventoryItem from '../../../shared/model/InventoryItem'
import * as uuid from '../../../shared/util/uuid'
import executeMutation from '../../test-utils/use-mutation.util'

describe('useDeleteItem', () => {
  it('should remove an item by id', async () => {
    const givenItemId = 'id'

    const expectedInventoryItem = {
      id: givenItemId,
      name: 'name',
      rank: 'rank',
      type: 'clothing',
      crossReference: 'crossReference',
      reorderPoint: '123',
      distributionUnit: 'ampoule',
      pricePerUnit: 1.23,
    } as InventoryItem

    jest.spyOn(InventoryRepository, 'find').mockResolvedValue(expectedInventoryItem)
    jest.spyOn(uuid, 'uuid').mockReturnValue(givenItemId)
    jest.spyOn(InventoryRepository, 'delete').mockResolvedValue(expectedInventoryItem)

    const result = await executeMutation(() => useDeleteItem(), {
      itemId: givenItemId,
    })

    expect(InventoryRepository.find).toHaveBeenCalledTimes(1)
    expect(InventoryRepository.delete).toHaveBeenCalledTimes(1)
    expect(InventoryRepository.delete).toHaveBeenCalledWith(expectedInventoryItem)
    expect(result).toEqual(expectedInventoryItem)
  })
})
