import React from 'react';

import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Router, Route } from 'react-router-dom'

import Inventory from '../../inventory/Inventory';
import { TitleProvider } from '../../page-header/title/TitleContext';
import { RootState } from '../../shared/store'
import Permissions from '../../shared/model/Permissions'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux';
import { expectOneConsoleError } from '../test-utils/console.utils'

const mockStore = createMockStore<RootState, any>([thunk])

const setup = (
  route: string,
  permissions: Permissions[],
  path: string
) => {
  const history = createMemoryHistory({ initialEntries: [route] })
  const store = mockStore({ user: { permissions } } as any)
  return {
    history, ...render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={path}>
            <TitleProvider>
              <Inventory />
            </TitleProvider>
          </Route>
        </Router>
      </Provider>
    )
  }
}

describe('AddInventoryItem', () => {
  it('add item and cancel buttons render', () => {
    setup('/inventory/new', [Permissions.AddItem], '/');
    expect(screen.getByRole('button', { name: "inventory.actions.add" })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "actions.cancel" })).toBeInTheDocument();
  })

  it('cancel returns you to inventory page', async () => {
    const { history } = setup('/inventory/new', [Permissions.AddItem, Permissions.ViewInventory], '/');
    const cancelButton = screen.getByRole('button', { name: "actions.cancel" });
    expect(cancelButton.textContent).toEqual(' actions.cancel ');
    fireEvent.click(cancelButton);
    expect(history.location.pathname).toEqual('/inventory');
    await waitFor(() => {
      expect(screen.getByText('inventory.items.name')).toBeInTheDocument();
    })
  })

  it ('add item requires fields to be entered', async () => {
    const { history } = setup('/inventory/new', [Permissions.AddItem, Permissions.ViewInventory, Permissions.ViewItem], '/');
    fireEvent.click(screen.getByRole('button', { name: "inventory.actions.add" }))
    expectOneConsoleError({
      itemNameError: 'inventory.items.error.nameRequired',
      rankError: 'inventory.items.error.rankRequired',
      crossReferenceError: 'inventory.items.error.crossReferenceRequired',
      reorderPointError: 'inventory.items.error.reorderPointRequired',
      pricePerUnitError: 'inventory.items.error.pricePerUnitRequired'
    })
    await waitFor(() => {
      expect(history.location.pathname).toMatch(/\/inventory\/new*/g)
    })
  })

  it('add item takes you to view item', async () => { 
    const { history } = setup('/inventory/new', [Permissions.AddItem, Permissions.ViewInventory, Permissions.ViewItem], '/');
    fireEvent.change(screen.getByLabelText('inventory.items.name'), { target: { value: 'a name' }})
    fireEvent.change(screen.getByLabelText('inventory.items.rank'), { target: { value:  'a rank' }})
    fireEvent.change(screen.queryAllByRole('combobox')[0], { target: { value: 'clothing'}})
    fireEvent.change(screen.getByLabelText('inventory.items.crossReference'), { target: { value:  'a cross reference' }})
    fireEvent.change(screen.getByLabelText('inventory.items.reorderPoint'), { target: { value:  5 }})
    fireEvent.change(screen.queryAllByRole('combobox')[1], { target: { value: 'bag'}})
    fireEvent.change(screen.getByLabelText('inventory.items.pricePerUnit'), { target: { value: 10 }})
    fireEvent.click(screen.getAllByRole('button')[0])
    await waitFor(() => {
      expect(history.location.pathname).toMatch(/\/inventory\/(?!edit|new)[a-z0-9]*/g)
    })    
  })

  it('text fields are editable', () => { 
    setup('/inventory/new', [Permissions.AddItem, Permissions.ViewInventory, Permissions.ViewItem], '/');
    screen.getAllByRole('textbox').forEach((tbox) => {
      expect(tbox).not.toBeDisabled()
    })
  })
})
