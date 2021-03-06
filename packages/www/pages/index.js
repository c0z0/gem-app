import React from 'react'

import redirectLogin from '../lib/redirect'
import GemList from '../components/GemList'

export default function Index() {
  return <GemList />
}

Index.getInitialProps = async ctx => {
  await redirectLogin(ctx, '/login')
  return {}
}
