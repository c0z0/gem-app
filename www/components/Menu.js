import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Container from './Container'

const MenuContainer = styled(Container)`
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.span`
  margin-left: 8px;
  font-weight: 400;
  margin-right: 20px;
  color: ${({theme}) => theme.main};
  font-size: 20px;
`

const Diamond = styled.img.attrs({
  src: '/static/diamond.svg',
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
`

export default function Menu({onLogout}) {
  return (
    <MenuContainer>
      <Logo>
        <Diamond />
        <Title>Gem</Title>
      </Logo>
      <div>
        <MenuItem href="" onClick={onLogout}>
          Logout
        </MenuItem>
        <MenuItem href="https://github.com/c0z0/gem-app">[src]</MenuItem>
      </div>
    </MenuContainer>
  )
}

Menu.propTypes = {
  onLogout: PropTypes.func.isRequired,
}
