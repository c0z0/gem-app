import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import SubMenu from './SubMenu'
import NewGem from './NewGem'
import { Caret } from './Svg'

const Action = styled.button`
  border: 1px solid #eaeaea;
  outline: none;
  background: white;
  z-index: 2;
  cursor: pointer;
  padding: 0 20px;
  line-height: 2.5rem;
  height: 2.5rem;
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
  border-radius: 7px 0 0 7px;

  ${({ active }) => active && `background: #fafafa; color: #484848;`}
`
const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  outline: none;
  color: #484848;
  border: 1px solid #eaeaea;
  transition: all 0.2s;
  border-left: none;
  border-radius: 0 7px 7px 0;

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

const HideMobile = styled.span`
  @media (${({ theme }) => theme.b.phoneOnly}) {
    display: none;
  }
`

const StyledCaret = styled(Caret)`
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
  onSearchQueryChange,
  favorites
}) {
  const [newGemVisible, setNewGemVisible] = useState(false)

  return (
    <SubMenu
      active={favorites ? '/favorites' : '/'}
      controls={
        <React.Fragment>
          <Action
            active={newGemVisible}
            onClick={() => setNewGemVisible(!newGemVisible)}
          >
            <StyledCaret flipped={newGemVisible} />{' '}
            <span>
              Add <HideMobile>gem</HideMobile>
            </span>
          </Action>
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={({ target: { value } }) => onSearchQueryChange(value)}
          />
        </React.Fragment>
      }
    >
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
    </SubMenu>
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
  searchQuery: PropTypes.string.isRequired,
  favorites: PropTypes.bool.isRequired
}
