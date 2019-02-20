import React from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { SubTitle, Title, Card } from '../components/Typography'
import Container from '../components/Container'
import { Diamond } from '../components/Svg'

const StyledDiamond = styled(Diamond).attrs({
  src: '/static/diamond.svg',
  alt: 'logo'
})`
  width: 200px;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    width: 64px;
    margin-left: 48px;
    margin-top: 128px;
  }
`

const Bg = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 33%;
  left: 0;
  z-index: -1;

  @media (${({ theme }) => theme.b.tabletUp}) {
    display: flex;
    align-items: center;
    flex-direction: row;

    background-image: ${({ theme }) => theme.mainGradient};
  }
`

const StyledContainer = styled(Container)`
  @media (${({ theme }) => theme.b.tabletUp}) {
    min-height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

const Half = styled.div`
  @media (${({ theme }) => theme.b.tabletUp}) {
    flex: 1;
  }
`

const VERIFY_MUTATION = gql`
  mutation Verify($token: String!) {
    verifyLogin(token: $token) {
      id
      pending
    }
  }
`

export default function Verify({ error }) {
  if (error) {
    return (
      <StyledContainer>
        <Bg />
        <Half>
          <StyledDiamond />
        </Half>
        <Half>
          <Card>
            <Title>Something went wrong,</Title>
            <SubTitle style={{ margin: 0 }}>Please try again</SubTitle>
          </Card>
        </Half>
      </StyledContainer>
    )
  }
  return (
    <StyledContainer>
      <Bg />
      <Half>
        <StyledDiamond />
      </Half>
      <Half>
        <Card>
          <Title>Login verified,</Title>
          <SubTitle style={{ margin: 0 }}>You may close this tab.</SubTitle>
        </Card>
      </Half>
    </StyledContainer>
  )
}

Verify.getInitialProps = async ({ query, apolloClient }) => {
  try {
    await apolloClient.mutate({
      mutation: VERIFY_MUTATION,
      variables: { token: query.t }
    })
    return { error: false }
  } catch (_) {
    return { error: true }
  }
}

Verify.propTypes = {
  error: PropTypes.bool.isRequired
}
