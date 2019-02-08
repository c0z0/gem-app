import React from 'react'
import styled, {keyframes} from 'styled-components'

export const Title = styled.h1`
  font-weight: normal;
  color: ${({theme}) => theme.main};
  font-size: 2rem;
  ${({light}) => light && `color: white;`}
`

export const P = styled.p`
  line-height: 1.5rem;
  ${({light}) => light && `color: white;`}
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
      <Elipsis>.</Elipsis>
      <Elipsis>.</Elipsis>
      <Elipsis>.</Elipsis>
    </React.Fragment>
  )
}
