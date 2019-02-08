import React from 'react'
import { render } from 'react-testing-library'
import { ThemeProvider } from 'styled-components'
import theme from '../../lib/theme'
import 'jest-styled-components'

import Footer from '../../components/Footer'

test('Footer matches snapshot', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Footer />
    </ThemeProvider>
  )

  expect(container).toMatchSnapshot()
})
