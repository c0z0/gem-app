import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

function outerHeight(el) {
  let height = el.offsetHeight
  const style = getComputedStyle(el)

  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10)
  return height
}

const Wrapper = styled.div`
  height: ${({ open, openHeight }) => (open ? openHeight : '0px')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  transition: all 0.2s;
  overflow: ${({ open }) => (open ? 'inherit' : 'hidden')};
  @media (${({ theme }) => theme.b.tabletUp}) {
    padding-top: ${({ open }) => (open ? '12px' : '0')};
  }
`

const Carret = styled.img.attrs({ src: '/static/carret.svg' })`
  transform: rotate(${({ flipped }) => (flipped ? '180deg' : '0deg')});

  transition: transform 0.2s;
  margin-right: 10px;
`

const Content = styled.div`
  padding-left: 32px;
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
  const contentRef = useRef(null)
  const [heightState, setHeight] = useState('0px')
  const [visibleState, setVisibleState] = useState(false)

  useEffect(() => {
    const height = outerHeight(contentRef.current)

    setHeight(`${height}px`)
  }, [children])

  return (
    <FolderWrapper
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <Title onClick={() => setVisibleState(!visibleState)}>
        <Carret flipped={visibleState} />
        <span>{title}</span>
      </Title>
      <Wrapper open={visibleState} openHeight={heightState}>
        <Content ref={contentRef}>{children}</Content>
      </Wrapper>
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
