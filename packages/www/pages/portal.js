import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import QRCode from 'qrcode.react'
import Router from 'next/router'

import redirectLogin from '../lib/redirect'
import Container from '../components/Container'
import { H1, P, Title } from '../components/Typography'

import Menu from '../components/Menu'

const Divider = styled.hr`
  background: #eee;
  border: none;
  height: 1px;
`

const Center = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const PORTAL_QUERY = gql`
  query getPortal($code: String!) {
    portal(code: $code) {
      href
      code
      id
    }
  }
`

export default function Portal({ code }) {
  const { data } = useQuery(PORTAL_QUERY, {
    variables: { code },
    pollInterval: 1000
  })

  if (data.portal) {
    window.location.replace(data.portal.href)
  }

  return (
    <React.Fragment>
      <Menu
        portalActive
        onLogout={e => {
          e.preventDefault()
          document.cookie = 'session=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          Router.replace('/login')
        }}
      />
      <Divider />
      <Container>
        <Center>
          <H1 />
          <QRCode value={code} fgColor="#484848" size={256} />
          <P>Or enter code:</P>
          <Title>{`${code.slice(0, 3)} ${code.slice(3)}`}</Title>
        </Center>
      </Container>
    </React.Fragment>
  )
}

Portal.propTypes = {
  code: PropTypes.string.isRequired
}

Portal.getInitialProps = async ctx => {
  await redirectLogin(ctx, '/login')

  const number = `000000${Math.floor(Math.random() * 1000000).toString()}`

  return { code: number.substr(number.length - 6) }
}
