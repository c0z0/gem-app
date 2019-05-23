import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Link from 'next/link'

import Container from './Container'
import { Diamond } from './Svg'

const MenuContainer = styled(Container)`
  padding-top: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Title = styled.span`
  margin-left: 8px;
  font-weight: 400;
  margin-right: 20px;
  color: ${({ theme }) => theme.main};
  font-size: 20px;
`

const StyledDiamond = styled(Diamond).attrs({
  alt: 'gem logo'
})`
  width: 40px;
`

const MenuItem = styled.a`
  color: #aaa;
  font-size: 14px;
  text-decoration: none;
  margin-left: 12px;
  transition: all 0.2s;

  &:hover {
    color: #484848;
  }

  ${({ active }) => active && 'color: #484848;'}
`

export default function Menu({ onLogout, portalActive }) {
  return (
    <MenuContainer>
      <Link href="/">
        <Logo>
          <StyledDiamond />
          <Title>Gem</Title>
        </Logo>
      </Link>
      <div>
        <Link href="/portal" passHref>
          <MenuItem active={portalActive}>Portal</MenuItem>
        </Link>
        <MenuItem href="" onClick={onLogout}>
          Logout
        </MenuItem>
        <MenuItem href="https://github.com/c0z0/gem-app">[src]</MenuItem>
      </div>
    </MenuContainer>
  )
}

Menu.defaultProps = {
  portalActive: false
}

Menu.propTypes = {
  onLogout: PropTypes.func.isRequired,
  portalActive: PropTypes.bool
}
