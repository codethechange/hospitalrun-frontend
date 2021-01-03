import { Spinner, Button, Toast } from '@hospitalrun/components'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs'
import { useUpdateTitle } from '../../page-header/title/TitleContext'
import useTranslator from '../../shared/hooks/useTranslator'
import InventoryItem from '../../shared/model/InventoryItem'
import useItem from '../hooks/useItem'
import useUpdateItem from '../hooks/useUpdateItem'
import ViewItemDetails from '../view/ViewItemDetails'

const EditItem = () => {
  const { t } = useTranslator()
  const { id } = useParams()

  const updateTitle = useUpdateTitle()
  updateTitle(t('inventory.items.edit'))
  const history = useHistory()

  const [newItem, setItem] = useState({} as InventoryItem)
  const { data: currentItem, isLoading: isLoadingItem } = useItem(id)

  const {
    mutate: updateMutate,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: updateMutateError,
  } = useUpdateItem(newItem)

  useAddBreadcrumbs([
    {
      i18nKey: 'inventory.items.edit',
      location: `/inventory/edit/${id}`,
    },
  ])

  useEffect(() => {
    if (currentItem !== undefined) {
      setItem(currentItem)
    }
  }, [currentItem])

  const onCancel = () => {
    history.push(`/inventory/${newItem.id}`)
  }

  const onSave = () => {
    if (_.isEmpty(updateMutateError) && !isErrorUpdate) {
      updateMutate(newItem).then(() => {
        Toast('success', t('states.success'), t('inventory.items.successfullyUpdated'))
        history.push(`/inventory/${newItem.id}`)
      })
    }
  }

  const onFieldChange = (key: string, value: string | boolean) => {
    setItem({
      ...newItem,

      [key]: value,
    })
  }

  if (isLoadingItem || isLoadingUpdate) {
    return <Spinner color="blue" loading size={[10, 25]} type="ScaleLoader" />
  }

  return (
    <div>
      <ViewItemDetails
        isEditable
        item={newItem}
        onFieldChange={onFieldChange}
        error={updateMutateError}
      />
      <div className="row float-right">
        <div className="btn-group btn-group-lg">
          <Button className="mr-2" color="success" onClick={onSave}>
            {t('actions.save')}
          </Button>
          <Button color="danger" onClick={onCancel}>
            {t('actions.cancel')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EditItem
