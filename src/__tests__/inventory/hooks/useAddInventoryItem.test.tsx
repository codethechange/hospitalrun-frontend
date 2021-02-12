/* eslint-disable no-console */

import shortid from 'shortid'

import * as itemValidator from '../../../inventory/add/validate-inventory-item'
import { InventoryItemError } from '../../../inventory/add/validate-inventory-item'
import useAddInventoryItem from '../../../inventory/hooks/useAddInventoryItem'
import InventoryRepository from '../../../shared/db/InventoryRepository'
import InventoryItem from '../../../shared/model/InventoryItem'
import executeMutation from '../../test-utils/use-mutation.util'

// This is code taken and slightly edited from Incidents. Not sure if you want
// to make use of it or start from scracth

describe('useAddInventoryItem', () => {
  //   beforeEach(() => {
  //     jest.restoreAllMocks()
  //     console.error = jest.fn()
  //   })
  //   it('should add an item with the correct data', async () => {
  //     const expectedId = '123456'
  //     const givenItemInformation = {
  //       name: 'some name',
  //       rank: 'some rank',
  //       type: 'clothing',
  //       crossReference: 'some cross reference',
  //       reorderPoint: 'some reorder point',
  //       distributionUnit: 'ampoule',
  //       pricePerUnit: 0,
  //       note: 'some note',
  //     } as InventoryItem
  //     const expectedItem = {
  //       ...givenItemInformation,
  //       id: `I-${expectedId}`,
  //     } as InventoryItem
  //     jest.spyOn(shortid, 'generate').mockReturnValue(expectedId)
  //     jest.spyOn(InventoryRepository, 'save').mockResolvedValue(expectedItem)
  //     const actualData = await executeMutation(() => useAddInventoryItem(), givenItemInformation)
  //     expect(InventoryRepository.save).toHaveBeenCalledTimes(1)
  //     expect(InventoryRepository.save).toBeCalledWith(expectedItem)
  //     expect(actualData).toEqual(expectedItem)
  //   })
  //   it('should throw an error if validation fails', async () => {
  //     // review InventoryItemError
  //     const expectedInventoryError = {
  //       description: 'some description error',
  //     } as InventoryItemError
  //     jest.spyOn(itemValidator, 'default').mockReturnValue(expectedInventoryError)
  //     jest.spyOn(InventoryRepository, 'save').mockResolvedValue({} as InventoryItem)
  //     try {
  //       await executeMutation(() => useAddInventoryItem(), {})
  //     } catch (e) {
  //       expect(e).toEqual(expectedInventoryError)
  //       expect(InventoryRepository.save).not.toHaveBeenCalled()
  //     }
  //   })
})
