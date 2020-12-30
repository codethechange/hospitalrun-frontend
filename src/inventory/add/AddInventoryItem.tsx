import { Button } from '@hospitalrun/components'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs'
import { useUpdateTitle } from '../../page-header/title/TitleContext'
import SelectWithLabelFormGroup, {
  Option,
} from '../../shared/components/input/SelectWithLabelFormGroup'
import TextFieldWithLabelFormGroup from '../../shared/components/input/TextFieldWithLabelFormGroup'
import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import useTranslator from '../../shared/hooks/useTranslator'
import InventoryItem from '../../shared/model/InventoryItem'
import useAddInventoryItem from '../hooks/useAddInventoryItem'
import { InventoryItemError } from './validate-inventory-item'

const AddInventoryItem = () => {
  const [mutate] = useAddInventoryItem()
  const { t } = useTranslator()
  const history = useHistory()
  const updateTitle = useUpdateTitle()
  useEffect(() => {
    updateTitle(t('inventory.items.new'))
  })
  const [error, setError] = useState<InventoryItemError | undefined>(undefined)

  const [addInventoryItem, setAddInventoryItem] = useState(({
    name: '',
    rank: '',
    type: '',
    crossReference: '',
    reorderPoint: ('' as unknown) as number,
    distributionUnit: '',
    pricePerUnit: ('' as unknown) as number,
    note: '',
  } as unknown) as InventoryItem)

  const typeOptions: Option[] = [
    { label: t('inventory.type.clothing'), value: 'clothing' },
    { label: t('inventory.type.equipment'), value: 'equipment' },
    { label: t('inventory.type.medication'), value: 'medication' },
  ]

  const distributionUnitOptions: Option[] = [
    { label: t('inventory.distributionUnit.ampoule'), value: 'ampoule' },
    { label: t('inventory.distributionUnit.bag'), value: 'bag' },
    { label: t('inventory.distributionUnit.bottle'), value: 'bottle' },
    { label: t('inventory.distributionUnit.box'), value: 'box' },
    { label: t('inventory.distributionUnit.bundle'), value: 'bundle' },
    { label: t('inventory.distributionUnit.capsule'), value: 'capsule' },
    { label: t('inventory.distributionUnit.case'), value: 'case' },
    { label: t('inventory.distributionUnit.container'), value: 'container' },
    { label: t('inventory.distributionUnit.cream'), value: 'cream' },
    { label: t('inventory.distributionUnit.each'), value: 'each' },
    { label: t('inventory.distributionUnit.gel'), value: 'gel' },
    { label: t('inventory.distributionUnit.nebule'), value: 'nebule' },
    { label: t('inventory.distributionUnit.ointment'), value: 'ointment' },
    { label: t('inventory.distributionUnit.pack'), value: 'pack' },
    { label: t('inventory.distributionUnit.pair'), value: 'pair' },
    { label: t('inventory.distributionUnit.pallet'), value: 'pallet' },
    { label: t('inventory.distributionUnit.patch'), value: 'patch' },
    { label: t('inventory.distributionUnit.pcs'), value: 'pcs' },
    { label: t('inventory.distributionUnit.pill'), value: 'pill' },
    { label: t('inventory.distributionUnit.plastic'), value: 'plastic' },
    { label: t('inventory.distributionUnit.polyamp'), value: 'polyamp' },
    { label: t('inventory.distributionUnit.rollset'), value: 'rollset' },
    { label: t('inventory.distributionUnit.spray'), value: 'spray' },
    { label: t('inventory.distributionUnit.suppository'), value: 'suppository' },
    { label: t('inventory.distributionUnit.suspension'), value: 'suspension' },
    { label: t('inventory.distributionUnit.syrup'), value: 'syrup' },
    { label: t('inventory.distributionUnit.tablet'), value: 'tablet' },
    { label: t('inventory.distributionUnit.tray'), value: 'tray' },
    { label: t('inventory.distributionUnit.tube'), value: 'tube' },
    { label: t('inventory.distributionUnit.vial'), value: 'vial' },
  ]

  const breadcrumbs = [
    {
      i18nKey: 'inventory.items.new',
      location: `/inventory/new`,
    },
  ]
  useAddBreadcrumbs(breadcrumbs)

  const onFieldChange = (key: string, value: string | boolean) => {
    setAddInventoryItem((previousAddInventoryItem) => ({
      ...previousAddInventoryItem,
      [key]: value,
    }))
  }

  const onTextInputChange = (text: string, key: string) => {
    setAddInventoryItem((previousAddInventoryItem) => ({
      ...previousAddInventoryItem,
      [key]: text,
    }))
  }

  const onSave = async () => {
    try {
      const newInventoryItem = await mutate(addInventoryItem as InventoryItem)
      history.push(`/inventory/${newInventoryItem?.id}`)
    } catch (e) {
      setError(e)
    }
  }

  const onCancel = () => {
    history.push('/inventory')
  }

  return (
    <>
      <form>
        <TextInputWithLabelFormGroup
          name="name"
          label={t('inventory.items.name')}
          isRequired
          isEditable
          isInvalid={!!error?.itemName}
          feedback={t(error?.itemName as string)}
          value={addInventoryItem.name}
          onChange={(event) => onTextInputChange(event.currentTarget.value, 'name')}
        />
        <TextInputWithLabelFormGroup
          name="rank"
          label={t('inventory.items.rank')}
          isRequired
          isEditable
          isInvalid={!!error?.rank}
          feedback={t(error?.rank as string)}
          value={addInventoryItem.rank}
          onChange={(event) => onTextInputChange(event.currentTarget.value, 'rank')}
        />
        <div className="form-group">
          <SelectWithLabelFormGroup
            name="type"
            label={t('inventory.items.type')}
            isRequired
            options={typeOptions}
            defaultSelected={typeOptions.filter(({ value }) => value === addInventoryItem.type)}
            onChange={(values) => onFieldChange && onFieldChange('type', values[0])}
            isEditable
          />
        </div>
        <TextInputWithLabelFormGroup
          name="crossReference"
          label={t('inventory.items.crossReference')}
          isRequired
          isEditable
          isInvalid={!!error?.crossReference}
          feedback={t(error?.crossReference as string)}
          value={addInventoryItem.crossReference}
          onChange={(event) => onTextInputChange(event.currentTarget.value, 'crossReference')}
        />
        <TextInputWithLabelFormGroup
          label={t('inventory.items.reorderPoint')}
          name="reorderPoint"
          isRequired
          isEditable
          value={(addInventoryItem.reorderPoint as unknown) as string}
          onChange={(event) => onTextInputChange(event.currentTarget.value, 'reorderPoint')}
          isInvalid={!!error?.reorderPoint}
          feedback={t(error?.reorderPoint as number)}
        />
        <div className="form-group">
          <SelectWithLabelFormGroup
            name="distributionUnit"
            label={t('inventory.items.distributionUnit')}
            isRequired
            options={distributionUnitOptions}
            defaultSelected={distributionUnitOptions.filter(
              ({ value }) => value === addInventoryItem.distributionUnit,
            )}
            onChange={(values) => onFieldChange && onFieldChange('distributionUnit', values[0])}
            isEditable
          />
        </div>
        <TextInputWithLabelFormGroup
          name="pricePerUnit"
          label={t('inventory.items.pricePerUnit')}
          isEditable
          isRequired
          value={(addInventoryItem.pricePerUnit as unknown) as string}
          onChange={(event) => onTextInputChange(event.currentTarget.value, 'pricePerUnit')}
          isInvalid={!!error?.pricePerUnit}
          feedback={t(error?.pricePerUnit as number)}
        />
        <div className="form-group">
          <TextFieldWithLabelFormGroup
            name="note"
            label={t('inventory.items.note')}
            isEditable
            value={addInventoryItem.note}
            onChange={(event) => onTextInputChange(event.currentTarget.value, 'note')}
          />
        </div>
        <div className="row float-right">
          <div className="btn-group btn-group-lg mt-3">
            <Button className="mr-2" color="success" onClick={onSave}>
              {t('inventory.actions.add')}
            </Button>
            <Button color="danger" onClick={onCancel}>
              {t('actions.cancel')}
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddInventoryItem
