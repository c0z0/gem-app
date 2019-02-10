import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import SubMenu from './SubMenu'

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

const HideMobile = styled.span`
  @media (${({ theme }) => theme.b.phoneOnly}) {
    display: none;
  }
`

const Plus = styled.img.attrs({ src: '/static/plus.svg' })`
  transform: rotate(${({ flipped }) => (flipped ? '180deg' : '0deg')});

  transition: transform 0.2s;
  margin-right: 10px;
`

export default function NotesToolbar({
  onNewNote,
  searchQuery,
  onSearchQueryChange
}) {
  return (
    <SubMenu
      active="/notes"
      controls={
        <React.Fragment>
          <Action onClick={onNewNote}>
            <Plus />{' '}
            <span>
              Create <HideMobile>note</HideMobile>
            </span>
          </Action>
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={({ target: { value } }) => onSearchQueryChange(value)}
          />
        </React.Fragment>
      }
    />
  )
}

NotesToolbar.propTypes = {
  onNewNote: PropTypes.func.isRequired,
  onSearchQueryChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired
}
