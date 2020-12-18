import React from 'react'
import { useSelector } from 'react-redux'
import { Switch } from 'react-router-dom'

import useAddBreadcrumbs from '../page-header/breadcrumbs/useAddBreadcrumbs'
import PrivateRoute from '../shared/components/PrivateRoute'
import Permissions from '../shared/model/Permissions'
import { RootState } from '../shared/store'
import AddItem from './add/AddItem'
import ViewInventory from './ViewInventory'
import ViewItem from './ViewItem'

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
        path="/incidents/new"
        component={AddItem}
      />
      <PrivateRoute
        isAuthenticated={permissions.includes(Permissions.ViewItem)}
        exact
        path="/incidents/:id"
        component={ViewItem}
      />
    </Switch>
  )
}

export default Inventory
