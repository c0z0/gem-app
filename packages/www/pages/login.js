import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import styled from 'styled-components'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import cookie from 'cookie'
import GoogleLogin from 'react-google-login'

import { Title, P, SubTitle, Card } from '../components/Typography'
import redirectLogin from '../lib/redirect'
import Container from '../components/Container'
import { EmailInput as Input } from '../components/Input'
import Button from '../components/Button'
import { Diamond } from '../components/Svg'

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

const GOOGLE_LOGIN_MUTATION = gql`
  mutation Login($token: String!) {
    googleLogin(token: $token) {
      token
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

const A = styled.a`
  color: ${({ theme }) => theme.main};
  text-decoration: none;
  transition: all 0.2s;
`

const Wrapper = styled.div`
  display: flex;
  height: 100vh;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    flex-direction: column;
  }
`

const Half = styled.div`
  @media (${({ theme }) => theme.b.tabletUp}) {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`

const Bg = styled.div`
  background: ${({ theme }) => theme.main};

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 33%;
  z-index: -1;
  background-image: ${({ theme }) => theme.mainGradient};

  @media (${({ theme }) => theme.b.phoneOnly}) {
    display: none;
  }
`

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

const GoogleSignInContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const GoogleSignInWrapper = styled.div`
  @media (${({ theme }) => theme.b.phoneOnly}) {
    margin-top: 12px;
  }
`

function setCookieAndRedirect(token) {
  document.cookie = cookie.serialize('session', token, {
    maxAge: 60 * 60 * 24 * 28 // 4 weeks
  })
  Router.replace('/')
}

export default function Login() {
  const [emailState, setEmail] = useState('')
  const [loadingState, setLoadingState] = useState(false)
  const [loginState, setLogin] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!loginState) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [loginState])

  const login = useMutation(LOGIN_MUTATION, {
    update: (_, { data }) => {
      setLogin(data.login)
      setLoadingState(false)
    }
  })

  const googleLogin = useMutation(GOOGLE_LOGIN_MUTATION, {
    update: (_, { data }) => {
      setLoadingState(false)
      setCookieAndRedirect(data.googleLogin.token)
    }
  })

  function renderForm() {
    return (
      <Card>
        <form
          onSubmit={e => {
            e.preventDefault()
            setLoadingState(true)
            login({ variables: { email: emailState } })
          }}
        >
          <Title>Welcome,</Title>
          <SubTitle>sign in to get started</SubTitle>
          <div>
            <Input
              innerRef={inputRef}
              style={{ marginTop: 0 }}
              disabled={loadingState}
              placeholder="you@domain.com"
              value={emailState}
              type="email"
              onChange={({ target: { value } }) => setEmail(value)}
            />
          </div>
          <GoogleSignInContainer>
            <Button type="submit" disabled={loadingState || !emailState.length}>
              {!loadingState ? 'Continue' : ['Loading', <Button.Elipsis />]}
            </Button>
            <GoogleSignInWrapper>
              <GoogleLogin
                clientId="795169533128-s76506bnacmbe77rto11vs2g9vs72rgg.apps.googleusercontent.com"
                render={({ onClick }) => (
                  <A href="" onClick={onClick} role="button">
                    Sign in with Google
                  </A>
                )}
                onSuccess={response => {
                  setLoadingState(true)
                  googleLogin({ variables: { token: response.tokenId } })
                }}
              />
            </GoogleSignInWrapper>
          </GoogleSignInContainer>
        </form>
      </Card>
    )
  }

  return (
    <Container>
      <Bg />
      <Wrapper>
        <Half>
          <StyledDiamond />
        </Half>
        <Half>
          {!loginState ? (
            renderForm()
          ) : (
            <Verification
              loginState={loginState}
              undo={e => {
                e.preventDefault()
                setLogin(null)
              }}
            />
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

function Verification({ loginState, undo }) {
  const { data, loading } = useQuery(LOGIN_QUERY, {
    variables: { id: loginState.id },
    pollInterval: 1000
  })

  if (!loading && !data.checkLogin.pending) {
    setCookieAndRedirect(data.checkLogin.token)
  }

  return (
    <Card>
      <Title>Awaiting Verification</Title>
      <P>
        We sent an email to <b>{loginState.user.email}</b> (
        <A href="" onClick={undo} role="button">
          undo
        </A>
        ).
      </P>
      <P>
        Please log in to your inbox, verify that the provided security code
        matches the following text: <b>{loginState.verificationCode}</b>.
      </P>
    </Card>
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
  }),
  undo: PropTypes.func.isRequired
}
