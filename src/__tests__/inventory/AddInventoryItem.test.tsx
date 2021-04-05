import React from 'react';
import Inventory from '../../inventory/Inventory';
import AddInventoryItem from '../../inventory/add/AddInventoryItem'

import { render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react'

describe('AddInventoryItem', () => {
  it('add item and cancel buttons render', () => {
    const { container, getByText } = render(<AddInventoryItem/>)
    console.log(container);
  })

  it('cancel returns you to inventory page', () => {})

  it('save takes you to view item', () => {})

  it('text fields are editable', () => {})
})
