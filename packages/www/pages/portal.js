import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import Container from '../components/Container'
import { H1, P } from '../components/Typography'
import Input from '../components/Input'
import Button from '../components/Button'

function generateID() {
  const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return `${s[Math.floor(Math.random() * s.length)]}${
    s[Math.floor(Math.random() * s.length)]
  }${s[Math.floor(Math.random() * s.length)]}`
}

function sanitizeID(code) {
  const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  return code
    .toUpperCase()
    .split('')
    .filter(c => s.includes(c))
    .join('')
}

const Center = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 64px;
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

const PORTAL_MUTATION = gql`
  mutation portal($code: String!, $href: String!) {
    createPortal(code: $code, href: $href) {
      code
    }
  }
`

const Code = styled(H1)`
  background: #f9f9f9;
  margin-top: 0px;

  padding: 16px 32px;
  letter-spacing: 8px;
  border-radius: 16px;
`

const SwitchRail = styled.div`
  position: relative;
  background: #f9f9f9;
  display: flex;
  border-radius: 16px;
  width: 256px;
  margin-bottom: 64px;
  user-select: none;
  cursor: pointer;
`

const SwitchText = styled.div`
  padding: 10px;
  flex: 1;
  z-index: 100;
  text-align: center;
  color: ${({ active }) => (active ? 'white' : '#484848')};
  transition: all 0.3s;
`

const SwitchKnob = styled.div`
  position: absolute;
  top: -4px;
  bottom: -4px;
  width: 128px;
  background: ${({ theme }) => theme.main};
  box-shadow: 0px 4px 14px rgba(117, 72, 155, 0.39);

  left: ${({ active }) => (active ? '128px' : '0')};
  border-radius: ${({ active }) =>
    active ? '2px 16px 16px 2px' : '16px 2px 2px 16px'};

  border-radius: 16px;
  transition: all 0.3s ease-out;
`

function PortalSwitch({ value, onClick }) {
  return (
    <SwitchRail onClick={onClick}>
      <SwitchText active={!value}>Recieve</SwitchText>
      <SwitchText active={value}>Send</SwitchText>
      <SwitchKnob active={value} />
    </SwitchRail>
  )
}

PortalSwitch.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 64px;
`

function SendUrl() {
  const [codeState, setCodeState] = useState('')
  const [hrefState, setHrefState] = useState('')
  const [loadingState, setLoadingState] = useState(false)

  const mutate = useMutation(PORTAL_MUTATION, {
    update: () => {
      setCodeState('')
      setHrefState('')
      setLoadingState(false)
    }
  })

  return (
    <Form
      onSubmit={e => {
        e.preventDefault()
        mutate({ variables: { code: codeState, href: hrefState } })
      }}
    >
      <Input
        disabled={loadingState}
        value={codeState}
        placeholder="Enter the unique code"
        onChange={({ target: { value } }) => setCodeState(sanitizeID(value))}
      />
      <Input
        value={hrefState}
        disabled={loadingState}
        placeholder="Enter the href"
        onChange={({ target: { value } }) => setHrefState(value)}
      />
      <Button
        disabled={loadingState || (!hrefState.length || codeState.length !== 3)}
      >
        {!loadingState ? 'Send' : ['Loading', <Button.Elipsis />]}
      </Button>
    </Form>
  )
}

function RecieveUrl({ code }) {
  const { data } = useQuery(PORTAL_QUERY, {
    variables: { code },
    pollInterval: 1000
  })

  if (data.portal) {
    window.location.replace(data.portal.href)
  }

  return (
    <React.Fragment>
      <P>Enter the code to recieve url:</P>
      <Code>{code}</Code>
    </React.Fragment>
  )
}

RecieveUrl.propTypes = {
  code: PropTypes.string.isRequired
}

export default function Portal({ code }) {
  const [switchState, setSwitchState] = useState(false)

  return (
    <Container>
      <Center>
        {/* <StyledDiamond /> */}
        <H1>Gem portal</H1>
        <PortalSwitch
          value={switchState}
          onClick={() => setSwitchState(!switchState)}
        />
        {!switchState ? <RecieveUrl code={code} /> : <SendUrl />}
      </Center>
    </Container>
  )
}

Portal.propTypes = {
  code: PropTypes.string.isRequired
}

Portal.getInitialProps = async () => ({ code: generateID() })
