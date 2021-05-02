import useItem from '../../../inventory/hooks/useItem'
import InventoryRepository from '../../../shared/db/InventoryRepository'
import InventoryItem from '../../../shared/model/InventoryItem'
import executeQuery from '../../test-utils/use-query.util'

describe('useItem', () => {
  it('should get an item by id', async () => {
    const givenItemId = 'some id'
    const expectedItem = {
      id: givenItemId,
    } as InventoryItem

    jest.spyOn(InventoryRepository, 'find').mockResolvedValue(expectedItem)

    const result = await executeQuery(() => useItem(givenItemId))

    expect(InventoryRepository.find).toHaveBeenCalledTimes(1)
    expect(InventoryRepository.find).toBeCalledWith(givenItemId)
    expect(result).toEqual(expectedItem)
  })
})
