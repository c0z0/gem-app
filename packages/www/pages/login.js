import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import styled from 'styled-components'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import cookie from 'cookie'

import { Title, P, LoadingElipsis } from '../components/Typography'
import redirectLogin from '../lib/redirect'
import Container from '../components/Container'
import { Input, Button } from '../components/FormElements'

const LOGIN_MUTATION = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      id
      verificationCode
      user {
        email
      }
    }
  }
`

const LOGIN_QUERY = gql`
  query Login($id: ID!) {
    checkLogin(id: $id) {
      token
      pending
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  height: 100vh;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    flex-direction: column;
  }
`

const Half = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:nth-child(2) {
    align-items: flex-start;
  }

  @media (${({ theme }) => theme.b.phoneOnly}) {
    &:nth-child(2) {
      justify-content: flex-start;
      align-items: center;
    }
  }
`

const Bg = styled.div`
  background: ${({ theme }) => theme.main};

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 50%;
  z-index: -1;
  background-image: ${({ theme }) => theme.mainGradient};

  @media (${({ theme }) => theme.b.phoneOnly}) {
    display: none;
  }
`

const Diamond = styled.img.attrs({
  src: '/static/diamond.svg',
  alt: 'logo'
})`
  width: 200px;
`

const TextWrapper = styled.div`
  margin-left: 60px;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    text-align: center;
    margin: 0;
  }
`

export default function Login() {
  const [emailState, setEmail] = useState('')
  const [loadingState, setLoadingState] = useState(false)
  const [loginState, setLogin] = useState(null)

  const login = useMutation(LOGIN_MUTATION, {
    update: (_, { data }) => {
      setLogin(data.login)
      setLoadingState(false)
    }
  })

  function renderForm() {
    return (
      <TextWrapper>
        <form
          onSubmit={e => {
            e.preventDefault()
            setLoadingState(true)
            login({ variables: { email: emailState } })
          }}
        >
          <Title>Welcome to Gem</Title>
          <P>Enter your email address to get started</P>
          <div>
            <Input
              disabled={loadingState}
              placeholder="you@domain.com"
              value={emailState}
              type="email"
              onChange={({ target: { value } }) => setEmail(value)}
            />
          </div>
          <Button type="submit" disabled={loadingState || !emailState.length}>
            {!loadingState ? 'Continue' : ['Loading', <LoadingElipsis />]}
          </Button>
        </form>
      </TextWrapper>
    )
  }

  return (
    <Container>
      <Bg />
      <Wrapper>
        <Half>
          <Diamond />
        </Half>
        <Half>
          {!loginState ? (
            renderForm()
          ) : (
            <Verification loginState={loginState} />
          )}
        </Half>
      </Wrapper>
    </Container>
  )
}

Login.getInitialProps = async ctx => {
  await redirectLogin(ctx, '/', false)

  return {}
}

function Verification({ loginState }) {
  const { data, loading } = useQuery(LOGIN_QUERY, {
    variables: { id: loginState.id },
    pollInterval: 1000
  })

  if (!loading && !data.checkLogin.pending) {
    document.cookie = cookie.serialize('session', data.checkLogin.token, {
      maxAge: 60 * 60 * 24 * 28 // 4 weeks
    })
    Router.replace('/')
  }

  return (
    <TextWrapper>
      <Title>Awaiting Verification</Title>
      <P>
        We sent an email to <b>{loginState.user.email}</b>.
      </P>
      <P>
        Please log in to your inbox, verify that the provided security code
        matches the following text: <b>{loginState.verificationCode}</b>
      </P>
      <P>
        Waiting for your confirmation
        <LoadingElipsis />
      </P>
    </TextWrapper>
  )
}

Verification.defaultProps = {
  loginState: null
}

Verification.propTypes = {
  loginState: PropTypes.shape({
    id: PropTypes.string,
    verificationCode: PropTypes.string,
    user: PropTypes.shape({
      email: PropTypes.string
    })
  })
}
