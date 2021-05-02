import { act } from '@testing-library/react-hooks'

import { InventoryItemError } from '../../../inventory/add/validate-inventory-item'
import useUpdateItem from '../../../inventory/hooks/useUpdateItem'
import InventoryRepository from '../../../shared/db/InventoryRepository'
import InventoryItem from '../../../shared/model/InventoryItem'
import executeMutation from '../../test-utils/use-mutation.util'

describe('useUpdateItem', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should update an inventory item successfully', async () => {
    let actualData: any
    const givenInventoryItem = {
      id: 'id',
      name: 'name',
      rank: 'rank',
      type: 'clothing',
      crossReference: 'crossReference',
      reorderPoint: '123',
      distributionUnit: 'ampoule',
      pricePerUnit: 1.23,
    } as InventoryItem

    jest.spyOn(InventoryRepository, 'saveOrUpdate').mockResolvedValue(givenInventoryItem)

    await act(async () => {
      actualData = await executeMutation(() => {
        const result = useUpdateItem(givenInventoryItem)
        return [result.mutate]
      }, givenInventoryItem)
    })

    expect(InventoryRepository.saveOrUpdate).toHaveBeenCalledTimes(1)
    expect(InventoryRepository.saveOrUpdate).toHaveBeenCalledWith(givenInventoryItem)
    expect(actualData).toEqual(givenInventoryItem)
  })

  it('should throw an error if fields are empty', async () => {
    let actualError: any
    const givenInventoryItem = {} as InventoryItem
    const expectedError = {
      itemNameError: 'inventory.items.error.nameRequired',
      rankError: 'inventory.items.error.rankRequired',
      crossReferenceError: 'inventory.items.error.crossReferenceRequired',
      reorderPointError: 'inventory.items.error.reorderPointInvalid',
      pricePerUnitError: 'inventory.items.error.pricePerUnitInvalid',
    } as InventoryItemError

    await executeMutation(() => {
      const result = useUpdateItem(givenInventoryItem)
      actualError = result.error
      return [result.mutate]
    }, givenInventoryItem)

    expect(actualError).toEqual(expectedError)
  })

  it('should throw an error if fields are not a valid number', async () => {
    let actualError: any
    const givenInventoryItem = {
      id: 'id',
      name: 'name',
      rank: 'rank',
      type: 'clothing',
      crossReference: 'crossReference',
      reorderPoint: 'abc',
      distributionUnit: 'ampoule',
      pricePerUnit: NaN,
    } as InventoryItem
    const expectedError = {
      reorderPointError: 'inventory.items.error.reorderPointInvalid',
      pricePerUnitError: 'inventory.items.error.pricePerUnitInvalid',
    } as InventoryItemError

    await executeMutation(() => {
      const result = useUpdateItem(givenInventoryItem)
      actualError = result.error
      return [result.mutate]
    }, givenInventoryItem)

    expect(actualError).toEqual(expectedError)
  })

  it('should throw an error if numerical fields are negative', async () => {
    let actualError: any
    const givenInventoryItem = {
      id: 'id',
      name: 'name',
      rank: 'rank',
      type: 'clothing',
      crossReference: 'crossReference',
      reorderPoint: '-123',
      distributionUnit: 'ampoule',
      pricePerUnit: -1.23,
    } as InventoryItem
    const expectedError = {
      reorderPointError: 'inventory.items.error.negative',
      pricePerUnitError: 'inventory.items.error.negative',
    } as InventoryItemError

    await executeMutation(() => {
      const result = useUpdateItem(givenInventoryItem)
      actualError = result.error
      return [result.mutate]
    }, givenInventoryItem)

    expect(actualError).toEqual(expectedError)
  })
})
