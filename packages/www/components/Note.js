import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

import { LoadingElipsis } from './Typography'
import { Dots } from './Svg'

const Container = styled.div`
  margin: 28px 0;
  padding-right: 18px;
  position: relative;
  color: #ddd;

  padding-bottom: 32px;
  margin-top: 32px;

  &:first-child {
    margin-top: 48px;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`

const Title = styled.a`
  color: ${({ theme }) => theme.main};
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    text-decoration: underline;
  }
`

const OptionsButton = styled.button`
  background: none;
  border: none;
  outline: none;
  position: absolute;
  top: -4px;
  right: -4px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s;
`

export const Tag = styled.span`
  margin: 4px;
  margin-left: 0;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  background: #eee;
  color: #aaa;
  transition: all 0.2s;

  &:hover {
    color: white;
    background: ${({ theme }) => theme.secondary};
  }
`

const MenuEntry = keyframes`
  0% {
    transform: translateY(-50%);
    opacity: 0; 
  }

  100% {
    transform: translateY(0);
    opacity: 1; 
  }
`

const Menu = styled.ul`
  position: absolute;
  top: calc(100% + 2px);
  z-index: 1;
  right: 0;
  animation: ${MenuEntry} 0.2s;
  padding: 0;
  min-width: 150px;
  border-radius: 5px;
  background: white;
  margin: 0;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.12);

  display: ${({ visible }) => (visible ? 'block' : 'none')};
`

const MenuItem = styled.li`
  padding: 0 18px;
  font-size: 14px;
  white-space: nowrap;
  line-height: 40px;
  color: ${({ red }) => (red ? 'red' : '#484848')};

  list-style: none;
  text-align: left;
  border-radius: 5px;
  display: block;
  transition: all 0.2s;

  &:hover {
    background: #fafafa;
  }

  &:not(:first-child) {
    border-radius: 0 0 5px 5px;
    border-top: 1px #ddd solid;
  }
`

export default function Note({ title, onDelete, id }) {
  const [optionsState, setOptions] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function clickEvent(e) {
      let targetElement = e.target
      const flyoutElement = menuRef.current

      do {
        if (targetElement === flyoutElement) {
          return
        }
        targetElement = targetElement.parentNode
      } while (targetElement)

      if (optionsState) setOptions(false)
    }
    document.addEventListener('click', clickEvent)

    return () => document.removeEventListener('click', clickEvent)
  })

  return (
    <Container>
      <OptionsButton onClick={() => setOptions(!optionsState)}>
        <Dots />
        <Menu visible={optionsState} ref={menuRef}>
          <MenuItem red onClick={() => onDelete(id)}>
            Delete
          </MenuItem>
        </Menu>
      </OptionsButton>
      <div>
        {id === 'optimistic-id' ? (
          <Title>
            Loading
            <LoadingElipsis />
          </Title>
        ) : (
          <Link href={`/editor?n=${id}`} as={`/editor/${id}`} passHref>
            <Title>{title.length ? title : 'Untitled'}</Title>
          </Link>
        )}
      </div>
    </Container>
  )
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
}
