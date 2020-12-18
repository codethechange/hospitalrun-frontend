import AbstractDBModel from './AbstractDBModel'

export default interface InventoryItem extends AbstractDBModel {
  id: string
  name: string
  rank: string
  type: 'clothing' | 'equipment' | 'medication'
  crossReference: string
  reorderPoint: string
  distributionUnit:
    | 'ampoule'
    | 'bag'
    | 'bottle'
    | 'box'
    | 'bundle'
    | 'capsule'
    | 'case'
    | 'container'
    | 'cream'
    | 'each'
    | 'gel'
    | 'nebule'
    | 'ointment'
    | 'pack'
    | 'pair'
    | 'pallet'
    | 'patch'
    | 'pcs'
    | 'pill'
    | 'plastic'
    | 'polyamp'
    | 'rollset'
    | 'spray'
    | 'suppository'
    | 'suspension'
    | 'syrup'
    | 'tablet'
    | 'tray'
    | 'tube'
    | 'vial'
  pricePerUnit: number
  note: string
}
