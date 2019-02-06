import React from 'react'
import styled from 'styled-components'

import Container from './Container'

const FooterContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    flex-direction: column;
  }
`

const Border = styled.div`
  background: #fafafa;
  border-top: solid 1px #eaeaea;
  padding: 48px 0;
  color: #cecece;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.span`
  margin-left: 8px;
  font-weight: 400;
  margin-right: 20px;
  color: #cecece;
  font-size: 20px;
`

const Diamond = styled.img.attrs({
  src: '/static/diamond.svg'
})`
  width: 40px;
  filter: grayscale(100%);
  opacity: 0.5;
`

const Link = styled.a`
  color: #cecece;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    color: #484848;
  }
`

export default function Footer() {
  return (
    <Border>
      <FooterContainer>
        <Logo>
          <Diamond />
          <Title>Gem</Title>
        </Logo>
        <p>
          Made by <Link href="https://cserdean.me">cserdean.me.</Link>
        </p>
      </FooterContainer>
    </Border>
  )
}
