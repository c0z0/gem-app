import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import { ThemeProvider } from 'styled-components'
import theme from '../../lib/theme'
import 'jest-styled-components'

import Menu from '../../components/Menu'

afterEach(cleanup)

test('Menu matches snapshot', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Menu onLogout={() => {}} />
    </ThemeProvider>
  )

  expect(container).toMatchSnapshot()
})

test('Menu logs out', () => {
  const onLogout = jest.fn()

  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <Menu onLogout={onLogout} />
    </ThemeProvider>
  )

  fireEvent.click(getByText('Logout'))

  expect(onLogout).toHaveBeenCalled()
})
