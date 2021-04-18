import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { ItemType } from '../../../inventory/model/ItemType'
import ViewInventoryTable from '../../../inventory/view/ViewInventoryTable'
import Inventory from '../../../shared/model/InventoryItem'
import Permissions from '../../../shared/model/Permissions'
import { RootState } from '../../../shared/store'
import InventoryRepository from '../../shared/db/InventoryRepository'

const mockStore = createMockStore<RootState, any>([thunk])
describe('ViewInventoryTable', () => {
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
  } as Inventory

  const setup = (location: string, permissions = true, type: ItemType) => {
    history = createMemoryHistory()
    history.push(location)
    return render(
      <Router history={history}>
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
          <ViewInventoryTable
            searchRequest={{
              text: 'a',
              type,
            }}
          />
        </Provider>
      </Router>,
    )
  }

  it('spinner renders when loading', () => {
    // jest.spyOn(InventoryRepository, 'search').mockReturnValue({ data: undefined, isLoading: true }));
  })

  it('renders table', async () => {
    setup('/', true, 'all')
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
    })
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('clicking view takes you to item details', () => {
    setup('/', true, 'all')
    userEvent.click(screen.getByText())
    expect(history.location.pathname).toEqual(`/inventory/${expectedInventory.id}`)
  })

  it('if there are no items, alert should pop up', () => {})

  it('data columns should match column headers', () => {})
})
