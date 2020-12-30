import InventoryItem from '../../shared/model/InventoryItem'

export class InventoryItemError extends Error {
  itemName?: string

  rank?: string

  crossReference?: string

  reorderPoint?: number

  pricePerUnit?: number

  constructor(
    message: string,
    itemName: string,
    rank: string,
    crossReference: string,
    reorderPoint: number,
    pricePerUnit: number,
  ) {
    super(message)
    this.itemName = itemName
    this.rank = rank
    this.crossReference = crossReference
    this.reorderPoint = reorderPoint
    this.pricePerUnit = pricePerUnit
    Object.setPrototypeOf(this, InventoryItemError.prototype)
  }
}

export default function validateItem(item: InventoryItem): InventoryItemError {
  const newError: any = {}

  if (!item.name) {
    newError.itemName = 'inventory.items.error.nameRequired'
  }

  if (!item.rank) {
    newError.rank = 'inventory.items.error.rankRequired'
  }

  if (!item.crossReference) {
    newError.crossReference = 'inventory.items.error.crossReferenceRequired'
  }

  if (!item.reorderPoint) {
    newError.reorderPoint = 'inventory.items.error.reorderPointRequired'
  }

  if (Number.isNaN(Number(item.reorderPoint))) {
    newError.reorderPoint = 'inventory.items.error.reorderPointNaN'
  }

  if (!item.pricePerUnit) {
    newError.pricePerUnit = 'inventory.items.error.pricePerUnitRequired'
  }

  if (Number.isNaN(Number(item.pricePerUnit))) {
    newError.pricePerUnit = 'inventory.items.error.pricePerUnitNaN'
  }

  return newError as InventoryItemError
}
