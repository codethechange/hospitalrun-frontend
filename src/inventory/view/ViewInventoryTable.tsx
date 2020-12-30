import { Spinner, Table } from '@hospitalrun/components'
import React from 'react'
import { useHistory } from 'react-router'

import useTranslator from '../../shared/hooks/useTranslator'
import useInventory from '../hooks/useInventory'
import InventorySearchRequest from '../model/InventorySearchRequest'

interface Props {
  searchRequest: InventorySearchRequest
}

function ViewInventoryTable(props: Props) {
  const { searchRequest } = props
  const { t } = useTranslator()
  const history = useHistory()
  const { data, isLoading } = useInventory(searchRequest)

  if (data === undefined || isLoading) {
    return <Spinner type="DotLoader" loading />
  }

  return (
    <>
      <Table
        getID={(row) => row.id}
        data={data}
        columns={[
          {
            label: t('inventory.items.name'),
            key: 'name',
          },
          {
            label: t('inventory.items.type'),
            key: 'type',
          },
          {
            label: t('inventory.items.reorderPoint'),
            key: 'reorderPoint',
          },
          {
            label: t('inventory.items.distributionUnit'),
            key: 'distributionUnit',
          },
          {
            label: t('inventory.items.pricePerUnit'),
            key: 'pricePerUnit',
          },
        ]}
        actionsHeaderText={t('actions.label')}
        actions={[
          {
            label: t('actions.view'),
            action: (row) => history.push(`incidents/${row.id}`),
          },
        ]}
      />
    </>
  )
}

export default ViewInventoryTable
