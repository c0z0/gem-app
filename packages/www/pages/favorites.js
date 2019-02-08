import React from 'react'

import redirectLogin from '../lib/redirect'
import GemList from '../components/GemList'

export default function Favorites() {
  return <GemList favorites />
}

Favorites.getInitialProps = async ctx => {
  await redirectLogin(ctx, '/login')
  return {}
}
