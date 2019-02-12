import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import PropTypes from 'prop-types'

import Container from './Container'

const Badge = styled.span`
  background: ${({ theme }) => theme.main};
  color: #fff;
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  line-height: 15px;
  padding: 0 4px;
  height: 15px;
  min-width: 15px;
  border-radius: 7px;
  text-align: center;

  margin-right: 4px;
`

const Border = styled.div`
  border-bottom: solid 1px #eee;
  position: sticky;
  z-index: 2;
  top: 0;
  background: white;
  transition: all 0.2s;

  box-shadow: ${({ floating }) =>
    floating ? '0px 2px 22px -6px rgba(0,0,0,0.15)' : 'none'};
`

const MenuContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    justify-content: space-between;
    padding-top: 4px;
    padding-bottom: 12px;
  }
`

const MenuItem = styled.a`
  color: ${({ active }) => (active ? '#484848' : '#aaa')};
  font-size: 14px;
  text-decoration: none;
  margin-left: 12px;
  transition: all 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    color: #484848;
  }

  @media (${({ theme }) => theme.b.phoneOnly}) {
    margin-left: 0;
  }
`
const Diamond = styled.img.attrs({
  src: '/static/diamond.svg'
})`
  width: 24px;
  height: 24px;
  margin-right: 12px;
  transition: all 0.2s;

  transform: translateY(${({ visible }) => (visible ? '0' : '-24px')});
  opacity: ${({ visible }) => (visible ? '1' : '0')};
`

const ToolbarContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    display: block;
  }
`

const SearchContainer = styled.div`
  padding-top: 8px;
  flex: 2;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (${({ theme }) => theme.b.phoneOnly}) {
    padding-bottom: 16px;
  }
`

const ControlsContainer = styled.div`
  flex: 2;
  transition: all 0.2s;
  display: flex;
  margin-left: ${({ diamondVisible }) => (diamondVisible ? '0' : '-36px')};

  @media (${({ theme }) => theme.b.phoneOnly}) {
    justify-content: space-between;
  }
`

export default function SubMenu({ controls, children, active }) {
  const [diamondVisible, setDiamondVisible] = useState(false)
  const toolbarRef = useRef(null)

  useEffect(() => {
    function scrollListener() {
      const { y } = toolbarRef.current.getBoundingClientRect()
      if ((diamondVisible !== y) !== 0) setDiamondVisible(y === 0)
    }

    scrollListener()

    window.addEventListener('scroll', scrollListener)

    return () => window.removeEventListener('scroll', scrollListener)
  }, [])

  return (
    <Border ref={toolbarRef} floating={diamondVisible}>
      <ToolbarContainer>
        <SearchContainer>
          <Diamond visible={diamondVisible} />
          <ControlsContainer diamondVisible={diamondVisible}>
            {controls}
          </ControlsContainer>
        </SearchContainer>
        <MenuContainer>
          <Link href="/" passHref prefetch>
            <MenuItem active={active === '/'}>My Gems</MenuItem>
          </Link>
          <Link href="/favorites" passHref prefetch>
            <MenuItem active={active === '/favorites'}>Favorites</MenuItem>
          </Link>
          <Link href="/notes" passHref prefetch>
            <MenuItem active={active === '/notes'}>
              <Badge>New</Badge>
              Notes
            </MenuItem>
          </Link>
        </MenuContainer>
      </ToolbarContainer>
      <Container>{children}</Container>
    </Border>
  )
}

SubMenu.propTypes = {
  children: PropTypes.node,
  controls: PropTypes.node,
  active: PropTypes.string.isRequired
}

SubMenu.defaultProps = {
  children: null,
  controls: null
}
