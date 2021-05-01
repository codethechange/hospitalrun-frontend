import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { ItemType } from '../../../inventory/model/ItemType'
import ViewInventoryTable from '../../../inventory/view/ViewInventoryTable'
import InventoryRepository from '../../../shared/db/InventoryRepository'
import InventoryItem from '../../../shared/model/InventoryItem'
import Permissions from '../../../shared/model/Permissions'
import { RootState } from '../../../shared/store'

const mockStore = createMockStore<RootState, any>([thunk])
describe('ViewInventoryTable', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  let history = createMemoryHistory()
  const allPermissions = Object.values(Permissions)
  const store = mockStore({
    components: {},
    user: { permissions: allPermissions },
  } as any)

  const expectedInventory = {
    id: 'someId',
    name: 'someName',
    rank: 'someRank',
    type: 'clothing',
    reorderPoint: 'someReorderPoint',
    distributionUnit: 'bag',
  } as InventoryItem

  const setup = (location: string, permissions = true, type: ItemType) => {
    history = createMemoryHistory()
    history.push(location)
    return render(
      <Provider
        store={
          permissions
            ? store
            : mockStore({
                components: {},
                user: { permissions: [] },
              } as any)
        }
      >
        <Router history={history}>
          <Route path="/inventory">
            <ViewInventoryTable
              searchRequest={{
                text: 'a',
                type,
              }}
            />
          </Route>
        </Router>
      </Provider>,
    )
  }

  it('table does not render when loading', () => {
    setup('/inventory', true, 'all')
    jest.mock('../../../inventory/hooks/useInventory', () =>
      jest.fn(() => ({
        data: undefined,
        isLoading: true,
      })),
    )
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('renders table', async () => {
    setup('/inventory', true, 'all')
    jest.spyOn(InventoryRepository, 'search').mockResolvedValue([])
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
    })
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('clicking view takes you to item details', async () => {
    jest.spyOn(InventoryRepository, 'search').mockResolvedValue([expectedInventory])
    setup('/inventory', true, 'all')
    await waitFor(() => {
      expect(screen.getByText('someName')).toBeInTheDocument()
    })
    expect(screen.getAllByRole('button', { name: 'actions.view' }).length).toEqual(1)

    userEvent.click(await screen.getByRole('button', { name: 'actions.view' }))
    expect(history.location.pathname).toEqual(`/inventory/${expectedInventory.id}`)
  })

  it('data columns should match column headers', async () => {
    jest.spyOn(InventoryRepository, 'search').mockResolvedValue([expectedInventory])
    setup('/inventory', true, 'all')
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
    })
    const columns = screen.getAllByRole('columnheader')
    expect(columns[0]).toHaveTextContent('inventory.items.name')
    expect(columns[1]).toHaveTextContent('inventory.items.type')
    expect(columns[2]).toHaveTextContent('inventory.items.reorderPoint')
    expect(columns[3]).toHaveTextContent('inventory.items.distributionUnit')
    expect(columns[4]).toHaveTextContent('inventory.items.pricePerUnit')
    expect(columns[5]).toHaveTextContent('actions.label')
  })
})
