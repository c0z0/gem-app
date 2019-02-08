import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Container from './Container'
import NewGem from './NewGem'

const ToolbarContainer = styled(Container)`
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
`

const ControlsContainer = styled.div`
  display: flex;
  flex: 1;
  transition: all 0.2s;
  margin-left: ${({ diamondVisible }) => (diamondVisible ? '0' : '-36px')};
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

const Action = styled.button`
  border: 1px solid #eaeaea;
  outline: none;
  background: white;
  z-index: 2;
  cursor: pointer;
  padding: 8px 20px;
  padding-left: 10px;
  font-size: 16px;
  transition: all 0.2s;
  color: #484848;

  display: flex;
  align-items: center;

  &:hover {
    background: #fafafa;
    color: #484848;
  }

  color: ${({ theme }) => theme.main};
  font-weight: 500;
  border-radius: 4px 0 0 4px;

  ${({ active }) => active && `background: #fafafa; color: #484848;`}
`
const Input = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 16px;
  outline: none;
  color: #484848;
  border: 1px solid #eaeaea;
  transition: all 0.2s;
  border-left: none;
  border-radius: 0 4px 4px 0;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    background: #fafafa;
  }

  ${({ disabled }) =>
    disabled &&
    `border-color: #ddd; color: #ddd; background: #fafafa; cursor: not-allowed;`}
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

const HideMobile = styled.span`
  @media (${({ theme }) => theme.b.phoneOnly}) {
    display: none;
  }
`

const Carret = styled.img.attrs({ src: '/static/carret.svg' })`
  transform: rotate(${({ flipped }) => (flipped ? '180deg' : '0deg')});

  transition: transform 0.2s;
  margin-right: 10px;
`

export default function Toolbar({
  newGem,
  onNewGemChange,
  onNewGemSubmit,
  newGemLoading,
  searchQuery,
  onSearchQueryChange
}) {
  const [diamondVisible, setDiamondVisible] = useState(false)
  const [newGemVisible, setNewGemVisible] = useState(false)
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
        <Diamond visible={diamondVisible} />
        <ControlsContainer diamondVisible={diamondVisible}>
          <Action
            active={newGemVisible}
            onClick={() => setNewGemVisible(!newGemVisible)}
          >
            <Carret flipped={newGemVisible} />{' '}
            <span>
              Add <HideMobile>gem</HideMobile>
            </span>
          </Action>
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={({ target: { value } }) => onSearchQueryChange(value)}
          />
        </ControlsContainer>
      </ToolbarContainer>
      <Container>
        <NewGem
          loading={newGemLoading}
          onSubmit={nG => {
            setNewGemVisible(false)
            onNewGemSubmit(nG)
          }}
          visible={newGemVisible}
          newGem={newGem}
          onNewGemChange={onNewGemChange}
        />
      </Container>
    </Border>
  )
}

Toolbar.propTypes = {
  newGem: PropTypes.shape({
    url: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onNewGemChange: PropTypes.func.isRequired,
  onNewGemSubmit: PropTypes.func.isRequired,
  newGemLoading: PropTypes.bool.isRequired,
  onSearchQueryChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired
}
