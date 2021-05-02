import useInventory from '../../../inventory/hooks/useInventory'
import InventorySearchRequest from '../../../inventory/model/InventorySearchRequest'
import InventoryRepository from '../../../shared/db/InventoryRepository'
import InventoryItem from '../../../shared/model/InventoryItem'
import executeQuery from '../../test-utils/use-query.util'

describe('useInventory', () => {
  it('should search inventory with a successful query', async () => {
    const givenSearchRequest: InventorySearchRequest = {
      type: 'all',
      text: '',
    }
    const expectedItems = [
      {
        id: 'some id',
      },
    ] as InventoryItem[]

    jest.spyOn(InventoryRepository, 'search').mockResolvedValue(expectedItems)

    const result = await executeQuery(() => useInventory(givenSearchRequest))

    expect(InventoryRepository.search).toHaveBeenCalledTimes(1)
    expect(InventoryRepository.search).toBeCalledWith(givenSearchRequest)
    expect(result).toEqual(expectedItems)
  })
})
