import React from 'react'
import {render, fireEvent} from 'react-testing-library'

import Index from '../../pages/index'

test('Counter works', () => {
  const {container} = render(<Index />)

  expect(container.textContent).toBe('Counter: 0 +')

  fireEvent.click(container.querySelector('button'))

  expect(container.textContent).toBe('Counter: 1 +')
})
