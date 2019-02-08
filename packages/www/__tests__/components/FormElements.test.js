import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { ThemeProvider } from 'styled-components'
import theme from '../../lib/theme'
import 'jest-styled-components'

import { Input, Button } from '../../components/FormElements'

afterEach(cleanup)

test('Input matches snapshot', () => {
  const { container, rerender } = render(
    <ThemeProvider theme={theme}>
      <Input />
    </ThemeProvider>
  )

  expect(container).toMatchSnapshot()

  rerender(
    <ThemeProvider theme={theme}>
      <Input disabled />
    </ThemeProvider>
  )

  expect(container).toMatchSnapshot()
})

test('Button matches snapshot', () => {
  const { container, rerender } = render(
    <ThemeProvider theme={theme}>
      <Button />
    </ThemeProvider>
  )

  expect(container).toMatchSnapshot()

  rerender(
    <ThemeProvider theme={theme}>
      <Button disabled />
    </ThemeProvider>
  )

  expect(container).toMatchSnapshot()
})
