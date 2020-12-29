import { Button } from '@hospitalrun/components'
import React, { useEffect, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { useButtonToolbarSetter } from '../../page-header/button-toolbar/ButtonBarProvider'
import { useUpdateTitle } from '../../page-header/title/TitleContext'
import useTranslator from '../../shared/hooks/useTranslator'
import Permissions from '../../shared/model/Permissions'
import { RootState } from '../../shared/store'
import InventorySearchRequest from '../model/InventorySearchRequest'
import InventorySearch from './InventorySearch'
import ViewInventoryTable from './ViewInventoryTable'

const ViewInventory = () => {
  const { t } = useTranslator()
  const history = useHistory()
  const setButtons = useButtonToolbarSetter()
  const updateTitle = useUpdateTitle()
  useEffect(() => {
    updateTitle(t('inventory.items.label'))
  })
  const { permissions } = useSelector((state: RootState) => state.user)

  const getButtons = useCallback(() => {
    const buttons: React.ReactNode[] = []

    if (permissions.includes(Permissions.AddItem)) {
      buttons.push(
        <Button
          icon="add"
          onClick={() => history.push('/inventory/new')}
          outlined
          color="success"
          key="inventory.items.new"
        >
          {t('inventory.items.new')}
        </Button>,
      )
    }

    return buttons
  }, [permissions, history, t])

  useEffect(() => {
    setButtons(getButtons())
    return () => {
      setButtons([])
    }
  }, [getButtons, setButtons])

  const [searchRequest, setSearchRequest] = useState<InventorySearchRequest>({
    text: '',
    type: 'all',
  })

  const onSearchRequestChange = (newSearchRequest: InventorySearchRequest) => {
    setSearchRequest(newSearchRequest)
  }

  return (
    <>
      <InventorySearch searchRequest={searchRequest} onChange={onSearchRequestChange} />
      <ViewInventoryTable searchRequest={searchRequest} />
    </>
  )
}

export default ViewInventory
