import { Button } from '@hospitalrun/components'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useButtonToolbarSetter } from '../../page-header/button-toolbar/ButtonBarProvider'
import { useUpdateTitle } from '../../page-header/title/TitleContext'
import SelectWithLabelFormGroup, {
  Option,
} from '../../shared/components/input/SelectWithLabelFormGroup'
import useTranslator from '../../shared/hooks/useTranslator'
import InventoryFilter from '../InventoryFilter'
import ViewInventoryTable from './ViewInventoryTable'

const ViewInventory = () => {
  const { t } = useTranslator()
  const history = useHistory()
  const setButtonToolBar = useButtonToolbarSetter()
  const updateTitle = useUpdateTitle()
  useEffect(() => {
    updateTitle(t('inventory.items.label'))
  })
  const [searchFilter, setSearchFilter] = useState(InventoryFilter.all)

  useEffect(() => {
    setButtonToolBar([
      <Button
        key="newItemButton"
        outlined
        color="success"
        icon="add"
        onClick={() => history.push('/inventory/new')}
      >
        {t('inventory.items.new')}
      </Button>,
    ])

    return () => {
      setButtonToolBar([])
    }
  }, [setButtonToolBar, t, history])

  const filterOptions: Option[] = Object.values(InventoryFilter).map((filter) => ({
    label: t(`inventory.type.${filter}`),
    value: `${filter}`,
  }))

  return (
    <>
      <div className="row">
        <div className="col-md-3 col-lg-2">
          <SelectWithLabelFormGroup
            name="type"
            label={t('inventory.filterTitle')}
            options={filterOptions}
            defaultSelected={filterOptions.filter(({ value }) => value === searchFilter)}
            onChange={(values) => setSearchFilter(values[0] as InventoryFilter)}
            isEditable
          />
        </div>
      </div>
      <div className="row">
        <ViewInventoryTable searchRequest={{ type: searchFilter }} />
      </div>
    </>
  )
}

export default ViewInventory
