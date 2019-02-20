import React from 'react'
import { storiesOf } from '@storybook/react' // eslint-disable-line import/no-extraneous-dependencies

import Input from '../components/Input'

storiesOf('Input', module)
  .add('Standard', () => <Input placeholder="Place holder" />)
  .add('Disabled', () => <Input placeholder="Place holder" disabled />)
  .add('Flex', () => (
    <div style={{ display: 'flex' }}>
      <Input placeholder="Place holder" flex />
      <Input placeholder="Place holder" flex />
    </div>
  ))
