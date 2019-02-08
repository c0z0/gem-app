import React from 'react'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {P, Title} from '../components/Typography'

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-image: ${({theme}) => theme.mainGradient};
`

const VERIFY_MUTATION = gql`
  mutation Verify($token: String!) {
    verifyLogin(token: $token) {
      id
      pending
    }
  }
`

export default function Verify({error}) {
  if (error) {
    return (
      <Container>
        <Title light>Error</Title>
        <P light>Couldn{"'"}t verify login.</P>
      </Container>
    )
  }
  return (
    <Container>
      <Title light>Verified</Title>
      <P light>You may close this tab.</P>
    </Container>
  )
}

Verify.getInitialProps = async ({query, apolloClient}) => {
  try {
    await apolloClient.mutate({
      mutation: VERIFY_MUTATION,
      variables: {token: query.t},
    })
    return {error: false}
  } catch (_) {
    return {error: true}
  }
}

Verify.propTypes = {
  error: PropTypes.bool.isRequired,
}
