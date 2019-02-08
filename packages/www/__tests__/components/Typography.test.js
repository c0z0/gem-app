import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { ThemeProvider } from 'styled-components'
import theme from '../../lib/theme'
import 'jest-styled-components'

import { Title, LoadingElipsis, P } from '../../components/Typography'

afterEach(cleanup)

test('Title matches snapshot', () => {
  const { container, rerender } = render(
    <ThemeProvider theme={theme}>
      <Title>Test title</Title>
    </ThemeProvider>
  )

  expect(container).toMatchSnapshot()

  rerender(
    <ThemeProvider theme={theme}>
      <Title light>Test text</Title>
    </ThemeProvider>
  )

  expect(container).toMatchSnapshot()
})

test('P matches snapshot', () => {
  const { container, rerender } = render(
    <ThemeProvider theme={theme}>
      <P>Test text</P>
    </ThemeProvider>
  )

  expect(container).toMatchSnapshot()

  rerender(
    <ThemeProvider theme={theme}>
      <P light>Test text</P>
    </ThemeProvider>
  )

  expect(container).toMatchSnapshot()
})

test('LoadingElipsis matches snapshot', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <LoadingElipsis />
    </ThemeProvider>
  )

  expect(container).toMatchSnapshot()
})
