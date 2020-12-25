import { Spinner, Table } from '@hospitalrun/components'
import React from 'react'
import { useHistory } from 'react-router'

import useTranslator from '../../shared/hooks/useTranslator'
import useInventory from '../hooks/useInventory'
import InventorySearchRequest from '../model/InventorySearchRequest'

interface Props {
  searchRequest: InventorySearchRequest
}

export function populateExportData(dataToPopulate: any, theData: any) {
  let first = true
  if (theData != null) {
    theData.forEach((elm: any) => {
      const entry = {
        name: elm.name,
        type: elm.type,
        reorderPoint: elm.reorderPoint,
        distributionUnit: elm.distributionUnit,
        pricePerUnit: elm.pricePerUnit,
      }
      if (first) {
        dataToPopulate[0] = entry
        first = false
      } else {
        dataToPopulate.push(entry)
      }
    })
  }
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
            label: t('inventory.items.distributionUnitLabel'),
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
