import React from 'react'
import styled from 'styled-components'

import Container from './Container'

const ToolbarContainer = styled(Container)`
  padding: 20px 0;
  position: sticky;
  top: 0;
  padding-bottom: 8px;
  display: flex;
`

const Border = styled.div`
  border-bottom: solid 1px #eee;
`

const Action = styled.button`
  border: 1px solid #eaeaea;
  outline: none;
  cursor: pointer;
  padding: 6px 20px;
  font-size: 16px;
  transition: all 0.2s;
  color: #484848;

  &:hover {
    background: #fafafa;
    color: #484848;
  }

  &:first-child {
    color: ${({theme}) => theme.main};
    font-weight: 500;
    border-radius: 4px 0 0 4px;
  }
  &:last-child {
    border-radius: 0 4px 4px 0;
  }
`
const Input = styled.input`
  flex 1;
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

  ${({disabled}) =>
    disabled &&
    `border-color: #ddd; color: #ddd; background: #fafafa; cursor: not-allowed;`}

`

export default function Toolbar() {
  return (
    <Border>
      <ToolbarContainer>
        <Action>+ Add gem</Action>
        <Input placeholder="Search..." />
      </ToolbarContainer>
    </Border>
  )
}
