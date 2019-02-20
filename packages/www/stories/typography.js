import React from 'react'
import { storiesOf } from '@storybook/react' // eslint-disable-line import/no-extraneous-dependencies

import * as T from '../components/Typography'

storiesOf('Typography', module).add('Typography', () => (
  <div>
    <T.Title>Title title title</T.Title>
    <T.SubTitle>Subtitle subtitle subtitle</T.SubTitle>
    <T.H1>Heading 1 the first</T.H1>
    <T.P>
      Paragraph with <b>bold</b> and <i>italic</i> content.
    </T.P>
    <T.Title>
      Loading
      <T.LoadingElipsis />
    </T.Title>
  </div>
))
