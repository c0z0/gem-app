import { configure, addDecorator } from '@storybook/react'
import { withThemes } from 'storybook-styled-components'

import './styles.css'
import theme from '../lib/theme'

function loadStories() {
  require('../stories/button.js')
  // You can require as many stories as you need.
}

addDecorator(withThemes({ theme }))

configure(loadStories, module)
