import React from 'react'
import styled, { keyframes } from 'styled-components'

export const Title = styled.h1`
  font-weight: 400;
  color: ${({ theme }) => theme.main};
  font-size: 24px;
  ${({ light }) => light && `color: white;`}
  margin: 0;
`

export const Card = styled.div`
  padding: 48px;
  border-radius: 7px;
  background: white;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);

  @media (${({ theme }) => theme.b.phoneOnly}) {
    margin: 0;
    box-shadow: none;
    padding-top: 32px;
  }
`

export const SubTitle = styled.h2`
  font-weight: 400;
  text-transform: lowercase;
  font-size: 24px;
  color: #98a4a8;
  ${({ light }) => light && `color: white;`}
  margin: 0;
  margin-bottom: 24px;
`

export const P = styled.p`
  line-height: 1.5rem;
  ${({ light }) => light && `color: white;`}
`

export const H1 = styled.h1`
  font-size: 32px;
  margin: 2em 0 1em 0;
  font-weight: 600;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    margin: 1em 0 1em 0;
  }
`

const ElipsisAnimation = keyframes`
  0% {
    opacity: 0.2;
  }
  20% { 
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
`

const Elipsis = styled.span`
  animation: ${ElipsisAnimation} 1.4s infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`

export function LoadingElipsis() {
  return (
    <React.Fragment>
      <Elipsis key="a">.</Elipsis>
      <Elipsis key="b">.</Elipsis>
      <Elipsis key="c">.</Elipsis>
    </React.Fragment>
  )
}
