import { Spinner, Button, Modal, Toast } from '@hospitalrun/components'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs'
import { useButtonToolbarSetter } from '../../page-header/button-toolbar/ButtonBarProvider'
import { useUpdateTitle } from '../../page-header/title/TitleContext'
import useTranslator from '../../shared/hooks/useTranslator'
import Permissions from '../../shared/model/Permissions'
import { RootState } from '../../shared/store'
import useDeleteItem from '../hooks/useDeleteItem'
import useItem from '../hooks/useItem'
import ViewItemDetails from './ViewItemDetails'

const ViewItem = () => {
  const { t } = useTranslator()
  const updateTitle = useUpdateTitle()
  const { id } = useParams()
  const history = useHistory()
  const [deleteMutate] = useDeleteItem()
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false)
  const setButtonToolBar = useButtonToolbarSetter()
  const { permissions } = useSelector((state: RootState) => state.user)

  const { data: item } = useItem(id)
  useAddBreadcrumbs([
    {
      i18nKey: 'inventory.items.view',
      location: `/inventory/${id}`,
    },
  ])

  const onDeleteRequest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShowDeleteConfirmation(true)
  }

  const onDeleteConfirmation = () => {
    if (!item) {
      return
    }

    deleteMutate({ itemId: item.id }).then(() => {
      history.push('/inventory')
      Toast('success', t('states.success'), t('inventory.items.successfullyDeleted'))
    })
    setShowDeleteConfirmation(false)
  }

  const getButtons = useCallback(() => {
    const buttons: React.ReactNode[] = []
    if (item && permissions.includes(Permissions.AddItem)) {
      buttons.push(
        <>
          <Button
            key="editItemButton"
            color="success"
            icon="edit"
            outlined
            onClick={() => {
              history.push(`/inventory/edit/${item.id}`)
            }}
          >
            {t('actions.edit')}
          </Button>
          <Button key="deleteItemButton" color="danger" onClick={onDeleteRequest}>
            {t('inventory.items.delete')}
          </Button>
        </>,
      )
    }

    return buttons
  }, [item, history, permissions, t])

  useEffect(() => {
    setButtonToolBar(getButtons())

    return () => {
      setButtonToolBar([])
    }
  }, [getButtons, setButtonToolBar])

  useEffect(() => {
    updateTitle(t('inventory.items.view'))
  }, [t, updateTitle])

  return (
    <>
      {item ? (
        <div>
          <ViewItemDetails item={item} isEditable={false} />
          <Modal
            body={t('inventory.items.deleteConfirmationMessage')}
            buttonsAlignment="right"
            show={showDeleteConfirmation}
            closeButton={{
              children: t('actions.delete'),
              color: 'danger',
              onClick: onDeleteConfirmation,
            }}
            title={t('actions.confirmDelete')}
            toggle={() => setShowDeleteConfirmation(false)}
          />
        </div>
      ) : (
        <Spinner type="BarLoader" loading />
      )}
    </>
  )
}

export default ViewItem
