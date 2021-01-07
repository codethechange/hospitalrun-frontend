import { Alert } from '@hospitalrun/components'
import React from 'react'

import SelectWithLabelFormGroup, {
  Option,
} from '../../shared/components/input/SelectWithLabelFormGroup'
import TextFieldWithLabelFormGroup from '../../shared/components/input/TextFieldWithLabelFormGroup'
import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import useTranslator from '../../shared/hooks/useTranslator'
import InventoryItem from '../../shared/model/InventoryItem'

interface Props {
  item: InventoryItem
  isEditable: boolean
  error?: any
  onFieldChange?: (key: string, value: string | boolean) => void
}

const ViewItemDetails = (props: Props) => {
  const { onFieldChange, item, isEditable, error } = props
  const { t } = useTranslator()

  const onInputElementChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) =>
    onFieldChange && onFieldChange(fieldName, event.target.value)

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

  return (
    <>
      {error?.message && <Alert className="alert" color="danger" message={t(error?.message)} />}
      <TextInputWithLabelFormGroup
        name="name"
        label={t('inventory.items.name')}
        isRequired
        isEditable={isEditable}
        isInvalid={!!error?.itemNameError}
        feedback={t(error?.itemNameError as string)}
        value={item.name}
        onChange={(event) => onInputElementChange(event, 'name')}
      />
      <TextInputWithLabelFormGroup
        name="rank"
        label={t('inventory.items.rank')}
        isRequired
        isEditable={isEditable}
        isInvalid={!!error?.rankError}
        feedback={t(error?.rankError as string)}
        value={item.rank}
        onChange={(event) => onInputElementChange(event, 'rank')}
      />
      <div className="form-group">
        <SelectWithLabelFormGroup
          name="type"
          label={t('inventory.items.type')}
          isRequired
          options={typeOptions}
          defaultSelected={typeOptions.filter(({ value }) => value === item.type)}
          onChange={(values) => onFieldChange && onFieldChange('type', values[0])}
          isEditable={isEditable}
        />
      </div>
      <TextInputWithLabelFormGroup
        name="crossReference"
        label={t('inventory.items.crossReference')}
        isRequired
        isEditable={isEditable}
        isInvalid={!!error?.crossReferenceError}
        feedback={t(error?.crossReferenceError as string)}
        value={item.crossReference}
        onChange={(event) => onInputElementChange(event, 'crossReference')}
      />
      <TextInputWithLabelFormGroup
        label={t('inventory.items.reorderPoint')}
        name="reorderPoint"
        isRequired
        isEditable={isEditable}
        value={(item.reorderPoint as unknown) as string}
        onChange={(event) => onInputElementChange(event, 'reorderPoint')}
        isInvalid={!!error?.reorderPointError}
        feedback={t(error?.reorderPointError as string)}
      />
      <div className="form-group">
        <SelectWithLabelFormGroup
          name="distributionUnit"
          label={t('inventory.items.distributionUnit')}
          isRequired
          options={distributionUnitOptions}
          defaultSelected={distributionUnitOptions.filter(
            ({ value }) => value === item.distributionUnit,
          )}
          onChange={(values) => onFieldChange && onFieldChange('distributionUnit', values[0])}
          isEditable={isEditable}
        />
      </div>
      <TextInputWithLabelFormGroup
        name="pricePerUnit"
        label={t('inventory.items.pricePerUnit')}
        isEditable={isEditable}
        isRequired
        value={(item.pricePerUnit as unknown) as string}
        onChange={(event) => onInputElementChange(event, 'pricePerUnit')}
        isInvalid={!!error?.pricePerUnitError}
        feedback={t(error?.pricePerUnitError as string)}
      />
      <div className="form-group">
        <TextFieldWithLabelFormGroup
          name="note"
          label={t('inventory.items.note')}
          isEditable={isEditable}
          value={item.note}
          onChange={(event) => onFieldChange && onFieldChange('note', event.currentTarget.value)}
        />
      </div>
    </>
  )
}

export default ViewItemDetails
