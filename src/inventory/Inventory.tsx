import React from 'react'
import { useSelector } from 'react-redux'
import { Switch } from 'react-router-dom'

import useAddBreadcrumbs from '../page-header/breadcrumbs/useAddBreadcrumbs'
import PrivateRoute from '../shared/components/PrivateRoute'
import Permissions from '../shared/model/Permissions'
import { RootState } from '../shared/store'
import AddInventoryItem from './add/AddInventoryItem'
import EditItem from './edit/EditItem'
import ViewInventory from './view/ViewInventory'
import ViewItem from './view/ViewItem'

const Inventory = () => {
  const { permissions } = useSelector((state: RootState) => state.user)
  const breadcrumbs = [
    {
      i18nKey: 'inventory.label',
      location: `/inventory`,
    },
  ]
  useAddBreadcrumbs(breadcrumbs, true)

  return (
    <Switch>
      <PrivateRoute
        isAuthenticated={permissions.includes(Permissions.ViewInventory)}
        exact
        path="/inventory"
        component={ViewInventory}
      />
      <PrivateRoute
        isAuthenticated={permissions.includes(Permissions.AddItem)}
        exact
        path="/inventory/new"
        component={AddInventoryItem}
      />
      <PrivateRoute
        isAuthenticated={
          permissions.includes(Permissions.AddItem) && permissions.includes(Permissions.ViewItem)
        }
        exact
        path="/inventory/edit/:id"
        component={EditItem}
      />
      <PrivateRoute
        isAuthenticated={permissions.includes(Permissions.ViewItem)}
        exact
        path="/inventory/:id"
        component={ViewItem}
      />
    </Switch>
  )
}

export default Inventory
