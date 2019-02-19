import React from 'react'
import { storiesOf } from '@storybook/react' // eslint-disable-line import/no-extraneous-dependencies

import Button from '../components/Button'

storiesOf('Button', module)
  .add('Standard', () => <Button>Hello Button</Button>)
  .add('Secondary', () => <Button secondary>Secondary</Button>)
  .add('Loading', () => (
    <Button loading>
      Loading
      <Button.Elipsis />
    </Button>
  ))
  .add('Disabled', () => <Button disabled>Disabled</Button>)
