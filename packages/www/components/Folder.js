import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Expando from './Expando'
import { Caret } from './Svg'

const StyledCaret = styled(Caret)`
  transform: rotate(${({ flipped }) => (flipped ? '180deg' : '0deg')});

  transition: transform 0.2s;
  margin-right: 10px;
`

const Content = styled.div`
  padding-left: 32px;
  @media (${({ theme }) => theme.b.tabletUp}) {
    padding-top: ${({ open }) => (open ? '12px' : '0')};
  }
`

const FolderWrapper = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
    margin-bottom: 28px;
  }
`

const Title = styled.h4.attrs({ role: 'button' })`
  font-weight: normal;
  padding: 16px 0;
  font-size: 20px;
  cursor: pointer;
  margin: 0;
  display: flex;
  align-items: center;
`

export default function Folder({
  children,
  title,
  onDrop,
  onDragOver,
  onDragLeave
}) {
  const [visibleState, setVisibleState] = useState(false)

  return (
    <FolderWrapper
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <Title onClick={() => setVisibleState(!visibleState)}>
        <StyledCaret flipped={visibleState} />
        <span>{title}</span>
      </Title>
      <Expando open={visibleState}>
        <Content open={visibleState}>{children}</Content>
      </Expando>
    </FolderWrapper>
  )
}

Folder.defaultProps = {
  children: null,
  onDrop: () => {},
  onDragOver: () => {},
  onDragLeave: () => {}
}

Folder.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  onDrop: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func
}
