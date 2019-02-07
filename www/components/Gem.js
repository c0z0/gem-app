import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

import { LoadingElipsis } from './Typography'

const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const Container = styled.div`
  border-bottom: 1px solid #eee;
  margin: 32px 0;
  padding-right: 18px;
  position: relative;
  color: #ddd;

  &:first-child {
    margin-top: 48px;
  }

  &:last-child {
    margin-bottom: 0;
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
  top: 0;
  right: -4px;
  padding: 0 8px;
  cursor: pointer;
  transition: all 0.2s;
`

const Url = styled.a`
  color: #aaa;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    text-decoration: underline;
  }
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

const Dots = styled.img.attrs({ src: '/static/dots.svg' })``

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
  top: 100%;
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
  font-size: 12px;
  line-height: 40px;
  color: ${({ red }) => (red ? 'red' : '#444')};

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

export default function Gem({ title, href, displayUrl, tags, onDelete, id }) {
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
          <MenuItem onClick={() => copyToClipboard(href)}>Copy</MenuItem>
        </Menu>
      </OptionsButton>
      <div>
        <Title href={href}>
          {id === 'optimistic-id' ? (
            <React.Fragment>
              Loading
              <LoadingElipsis />
            </React.Fragment>
          ) : (
            title
          )}
        </Title>{' '}
        | <Url href={href}>{displayUrl}</Url>
      </div>
      <p>
        {!tags.length ? 'No tags...' : tags.map(t => <Tag key={t}>{t}</Tag>)}
      </p>
    </Container>
  )
}

Gem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  displayUrl: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDelete: PropTypes.func.isRequired
}
