import React from 'react'
import {Query} from 'react-apollo'
import Router from 'next/router'
import gql from 'graphql-tag'

import redirectLogin from '../lib/redirect'
import Menu from '../components/Menu'
import Toolbar from '../components/Toolbar'

const QUERY = gql`
  {
    viewer {
      email
      id
      gems {
        title
      }
    }
  }
`

export default function Index() {
  return (
    <React.Fragment>
      <Menu
        onLogout={e => {
          e.preventDefault()
          document.cookie = 'session=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          Router.replace('/login')
        }}
      />
      <Toolbar />
      <Query query={QUERY}>
        {({loading, data}) => {
          if (loading) return <h1>Loading</h1>

          if (data.viewer)
            return (
              <h1>
                {data.viewer.email} {data.viewer.id} {data.viewer.gems.length}
              </h1>
            )
          return <h1>Not logged ind </h1>
        }}
      </Query>
    </React.Fragment>
  )
}

Index.getInitialProps = async ctx => {
  await redirectLogin(ctx, '/login')
  return {}
}
