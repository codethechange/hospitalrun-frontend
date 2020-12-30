import React, { ChangeEvent } from 'react'

import SelectWithLabelFormGroup, {
  Option,
} from '../../shared/components/input/SelectWithLabelFormGroup'
import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import useTranslator from '../../shared/hooks/useTranslator'
import InventoryFilter from '../model/InventoryFilter'
import InventorySearchRequest from '../model/InventorySearchRequest'
import { ItemType } from '../model/ItemType'

interface Props {
  searchRequest: InventorySearchRequest
  onChange: (newSearchRequest: InventorySearchRequest) => void
}

const InventorySearch = (props: Props) => {
  const { searchRequest, onChange } = props
  const { t } = useTranslator()
  const filterOptions: Option[] = Object.values(InventoryFilter).map((filter) => ({
    label: t(`inventory.type.${filter}`),
    value: `${filter}`,
  }))

  const onSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    onChange({
      ...searchRequest,
      text: query,
    })
  }

  const onFilterChange = (filter: ItemType) => {
    onChange({
      ...searchRequest,
      type: filter,
    })
  }

  return (
    <div className="row">
      <div className="col-md-3 col-lg-2">
        <SelectWithLabelFormGroup
          name="filterStatus"
          label={t('inventory.filterTitle')}
          options={filterOptions}
          defaultSelected={filterOptions.filter(({ value }) => value === searchRequest.type)}
          onChange={(values) => onFilterChange(values[0] as ItemType)}
          isEditable
        />
      </div>
      <div className="col">
        <TextInputWithLabelFormGroup
          name="searchbox"
          label={t('inventory.actions.search')}
          placeholder={t('inventory.actions.search')}
          value={searchRequest.text}
          isEditable
          onChange={onSearchQueryChange}
        />
      </div>
    </div>
  )
}

export default InventorySearch
