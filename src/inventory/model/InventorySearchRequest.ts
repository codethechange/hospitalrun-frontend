import { ItemType } from './ItemType'

export default interface InventorySearchRequest {
  text: string
  type: ItemType
}
