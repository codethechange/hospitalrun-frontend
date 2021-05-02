import shortid from 'shortid'

import { InventoryItemError } from '../../../inventory/add/validate-inventory-item'
import useAddedItem from '../../../inventory/hooks/useAddInventoryItem'
import InventoryRepository from '../../../shared/db/InventoryRepository'
import InventoryItem from '../../../shared/model/InventoryItem'
import executeMutation from '../../test-utils/use-mutation.util'

describe('useAddInventoryItem', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should add an inventory item successfully', async () => {
    const givenInventoryItem = {
      name: 'name',
      rank: 'rank',
      type: 'clothing',
      crossReference: 'crossReference',
      reorderPoint: '123',
      distributionUnit: 'ampoule',
      pricePerUnit: 1.23,
    } as InventoryItem
    const expectedInventoryItemId = 'I-id'
    const expectedInventoryItem = {
      ...givenInventoryItem,
      id: expectedInventoryItemId,
    }

    jest.spyOn(shortid, 'generate').mockReturnValue('id')
    jest.spyOn(InventoryRepository, 'save').mockResolvedValue(expectedInventoryItem)

    const result = await executeMutation(() => useAddedItem(), givenInventoryItem)

    expect(InventoryRepository.save).toHaveBeenCalledTimes(1)
    expect(InventoryRepository.save).toHaveBeenCalledWith(expectedInventoryItem)
    expect(result).toEqual(expectedInventoryItem)
  })

  it('should throw an error if fields are empty', async () => {
    const givenInventoryItem = {} as InventoryItem
    const expectedError = {
      itemNameError: 'inventory.items.error.nameRequired',
      rankError: 'inventory.items.error.rankRequired',
      crossReferenceError: 'inventory.items.error.crossReferenceRequired',
      reorderPointError: 'inventory.items.error.reorderPointInvalid',
      pricePerUnitError: 'inventory.items.error.pricePerUnitInvalid',
    } as InventoryItemError

    jest.spyOn(InventoryRepository, 'save')

    try {
      await executeMutation(() => useAddedItem(), givenInventoryItem)
    } catch (e) {
      expect(e).toEqual(expectedError)
    }

    expect(InventoryRepository.save).not.toHaveBeenCalled()
  })

  it('should throw an error if fields are not a valid number', async () => {
    const givenInventoryItem = {
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

    jest.spyOn(InventoryRepository, 'save')

    try {
      await executeMutation(() => useAddedItem(), givenInventoryItem)
    } catch (e) {
      expect(e).toEqual(expectedError)
    }

    expect(InventoryRepository.save).not.toHaveBeenCalled()
  })

  it('should throw an error if numerical fields are negative', async () => {
    const givenInventoryItem = {
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

    jest.spyOn(InventoryRepository, 'save')

    try {
      await executeMutation(() => useAddedItem(), givenInventoryItem)
    } catch (e) {
      expect(e).toEqual(expectedError)
    }

    expect(InventoryRepository.save).not.toHaveBeenCalled()
  })
})
