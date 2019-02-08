import React from 'react'
import { render } from 'react-testing-library'
import 'jest-styled-components'

import Container from '../../components/Container'

test('Container matches snapshot', () => {
  const { container } = render(<Container />)

  expect(container).toMatchSnapshot()
})
