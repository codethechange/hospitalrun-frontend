import InventoryItem from '../../shared/model/InventoryItem'

export class InventoryItemError extends Error {
  itemNameError?: string

  rankError?: string

  crossReferenceError?: string

  reorderPointError?: string

  pricePerUnitError?: string

  constructor(
    message: string,
    itemNameError: string,
    rankError: string,
    crossReferenceError: string,
    reorderPointError: string,
    pricePerUnitError: string,
  ) {
    super(message)
    this.itemNameError = itemNameError
    this.rankError = rankError
    this.crossReferenceError = crossReferenceError
    this.reorderPointError = reorderPointError
    this.pricePerUnitError = pricePerUnitError
    Object.setPrototypeOf(this, InventoryItemError.prototype)
  }
}

export default function validateItem(item: InventoryItem): InventoryItemError {
  const newError: any = {}

  if (!item.name) {
    newError.itemNameError = 'inventory.items.error.nameRequired'
  }

  if (!item.rank) {
    newError.rankError = 'inventory.items.error.rankRequired'
  }

  if (!item.crossReference) {
    newError.crossReferenceError = 'inventory.items.error.crossReferenceRequired'
  }

  if (!item.reorderPoint) {
    newError.reorderPointError = 'inventory.items.error.reorderPointRequired'
  }

  if (Number.isNaN(Number(item.reorderPoint))) {
    newError.reorderPointError = 'inventory.items.error.reorderPointNaN'
  }

  if (Number(item.reorderPoint) < 0) {
    newError.reorderPointError = 'inventory.items.error.negative'
  }

  if (!item.pricePerUnit) {
    newError.pricePerUnitError = 'inventory.items.error.pricePerUnitRequired'
  }

  if (Number.isNaN(Number(item.pricePerUnit))) {
    newError.pricePerUnitError = 'inventory.items.error.pricePerUnitNaN'
  }

  if (Number(item.pricePerUnit) < 0) {
    newError.pricePerUnitError = 'inventory.items.error.negative'
  }

  return newError as InventoryItemError
}
