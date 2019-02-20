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
  .add('Small', () => <Button small>Small</Button>)
  .add('Small secondary', () => (
    <Button small secondary>
      Small Secondary
    </Button>
  ))
  .add('Flat', () => <Button flat>Flat</Button>)
  .add('Flat secondary', () => (
    <Button flat secondary>
      Flat secondary
    </Button>
  ))
