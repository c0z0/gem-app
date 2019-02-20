import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: ${({ open, openHeight }) => (open ? openHeight : '0px')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  transition: all 0.2s;
  overflow: ${({ open }) => (open ? 'inherit' : 'hidden')};
  @media (${({ theme }) => theme.b.tabletUp}) {
    padding-top: ${({ open }) => (open ? '12px' : '0')};
  }
`

export default function Expando({ children, open }) {
  const contentRef = useRef(null)
  const [heightState, setHeight] = useState('0px')

  useEffect(() => {
    const height = contentRef.current.offsetHeight

    setHeight(`${height}px`)
  }, [children])

  return (
    <Wrapper open={open} openHeight={heightState}>
      <div ref={contentRef}>{children}</div>
    </Wrapper>
  )
}

Expando.defaultProps = {
  children: null
}

Expando.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node
}
