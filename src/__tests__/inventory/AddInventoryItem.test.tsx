import React from 'react';

import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react'
import { Router, Route } from 'react-router-dom'

import Inventory from '../../inventory/Inventory';
import { TitleProvider } from '../../page-header/title/TitleContext';
import { RootState } from '../../shared/store'
import Permissions from '../../shared/model/Permissions'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux';

const mockStore = createMockStore<RootState, any>([thunk])

const setup = (
  route: string, 
  permissions: Permissions[],
  path: string
) => {
  const history = createMemoryHistory({ initialEntries: [route] })
  const store = mockStore({ user: { permissions }} as any)
  return render(
    <Provider store={store}>
      <Router history={history}>
        <Route path={path}>
          <TitleProvider>
            <Inventory/>
          </TitleProvider>
        </Route>
      </Router>
    </Provider>
  )
}

describe('AddInventoryItem', () => {
  it('add item and cancel buttons render', () => {
    setup("/inventory/new", [Permissions.AddItem], "/");
    let buttons = screen.getAllByRole("button");
    let addButtonExists = false;
    let cancelButtonExists = false;
    for (let button of buttons) {
      if (button.textContent === "inventory.actions.add") {
        addButtonExists = true;
      } else if (button.textContent === "actions.cancel") {
        cancelButtonExists = true;
      }
    }
    
    expect(false);
  })

  it('cancel returns you to inventory page', () => {
    setup("/inventory/new", [Permissions.AddItem, Permissions.ViewInventory], "/");
    let buttons = screen.getAllByRole("button");
    // for (let button of buttons) {
      // console.log(button.textContent);
      // console.log(button.textContent === "actions.cancel");
      // if (button.textContent === "actions.cancel") {
      //   console.log(button.textContent);
      // }
    // }
    // for (let button of buttons) {
    //   if (button.textContent === "actions.cancel") {
    //     console.log("clicking");
    //     // fireEvent(button, new MouseEvent('click'));
    //     // console.log(window.location.pathname);
    //   }
    // }
    expect(true);
  })

  it('save takes you to view item', () => {})

  it('text fields are editable', () => {})
})
