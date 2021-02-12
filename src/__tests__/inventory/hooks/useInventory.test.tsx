import { act, renderHook } from '@testing-library/react-hooks'

import useInventory from '../../../inventory/hooks/useInventory'
import InventorySearchRequest from '../../../inventory/model/InventorySearchRequest'
import InventoryRepository from '../../../shared/db/InventoryRepository'
import InventoryItem from '../../../shared/model/InventoryItem'
import waitUntilQueryIsSuccessful from '../../test-utils/wait-for-query.util'

describe('useInventory', () => {
  it('should search inventory', async () => {
    const expectedSearchRequest: InventorySearchRequest = {
      type: 'all',
      text: '',
    }
    const expectedItems = [
      {
        id: 'some id',
      },
    ] as InventoryItem[]
    jest.spyOn(InventoryRepository, 'search').mockResolvedValue(expectedItems)

    let actualData: any
    await act(async () => {
      const renderHookResult = renderHook(() => useInventory(expectedSearchRequest))
      const { result } = renderHookResult
      await waitUntilQueryIsSuccessful(renderHookResult)
      actualData = result.current.data
    })

    expect(InventoryRepository.search).toHaveBeenCalledTimes(1)
    expect(InventoryRepository.search).toBeCalledWith(expectedSearchRequest)
    expect(actualData).toEqual(expectedItems)
  })
})
