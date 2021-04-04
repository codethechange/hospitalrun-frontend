import { renderHook, act } from '@testing-library/react-hooks'

import useItem from '../../../inventory/hooks/useItem'
import InventoryRepository from '../../../shared/db/InventoryRepository'
import InventoryItem from '../../../shared/model/InventoryItem'

describe('useItem', () => {
  it('should get an item by id', async () => {
    // TODO: refactor to RTL
    // const expectedItemId = 'some id'
    // const expectedItem = {
    //   id: expectedItemId,
    // } as InventoryItem
    // jest.spyOn(InventoryRepository, 'find').mockResolvedValue(expectedItem)
    // let actualData: any
    // await act(async () => {
    //   const renderHookResult = renderHook(() => useItem(expectedItemId))
    //   const { result } = renderHookResult
    //   await waitUntilQueryIsSuccessful(renderHookResult)
    //   actualData = result.current.data
    // })
    // expect(InventoryRepository.find).toHaveBeenCalledTimes(1)
    // expect(InventoryRepository.find).toBeCalledWith(expectedItemId)
    // expect(actualData).toEqual(expectedItem)
  })
})
