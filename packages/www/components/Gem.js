import React, { useState, useRef } from 'react'
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
  padding-right: 18px;
  padding-bottom: 28px;
  position: relative;
  color: #ddd;
`

const FakeMargin = styled.div`
  padding: 14px 0;

  &:not(:last-child) ${Container} {
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

  cursor: pointer;
  transition: all 0.2s;
`

const OptionsContainer = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  padding: 8px;
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
  cursor: pointer;
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

  &:not(:last-child) {
    border-radius: 5px 5px 0 0;
    border-bottom: 1px #ddd solid;
  }
`

const Tags = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`

const Star = styled.img.attrs({ src: '/static/star.svg' })`
  width: 14px;
  margin-right: 8px;
  cursor: pointer;
`

export default function Gem({
  title,
  href,
  displayUrl,
  tags,
  favorite,
  onDelete,
  id,
  onTagClick,
  onToggleFavorite,
  onDrag,
  onDragEnd,
  onMoveGem,
  folderId,
  folders
}) {
  const [optionsState, setOptions] = useState(false)
  const [moveMenu, setMoveMenu] = useState(false)
  const [showNewFolder, setShowNewFolder] = useState(false)
  // const [newFolderTitle, setNewFolderTitle] = useState('')

  const menuRef = useRef(null)

  return (
    <FakeMargin draggable onDrag={onDrag} onDragEnd={onDragEnd}>
      <Container>
        <OptionsContainer>
          <OptionsButton
            onClick={() => {
              setOptions(!optionsState)
              setMoveMenu(false)
            }}
          >
            <Dots />
          </OptionsButton>

          <Menu visible={optionsState} ref={menuRef}>
            {moveMenu ? (
              showNewFolder ? (
                <React.Fragment>
                  <MenuItem onClick={() => setShowNewFolder(false)}>
                    Back
                  </MenuItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <MenuItem onClick={() => setMoveMenu(false)}>Back</MenuItem>
                  <MenuItem
                    onClick={() => setShowNewFolder(true)}
                    style={{ marginBottom: '8px' }}
                  >
                    New folder
                  </MenuItem>
                  {folders.map(f => (
                    <MenuItem
                      key={f.id}
                      onClick={() => onMoveGem({ id, folderId: f.id })}
                    >
                      {f.title}
                    </MenuItem>
                  ))}
                  {folderId && (
                    <MenuItem onClick={() => onMoveGem({ id, folderId: null })}>
                      Remove from folder
                    </MenuItem>
                  )}
                </React.Fragment>
              )
            ) : (
              <React.Fragment>
                <MenuItem onClick={() => copyToClipboard(href)}>
                  Copy to clipboard
                </MenuItem>
                <MenuItem onClick={() => onToggleFavorite({ id, favorite })}>
                  {favorite ? 'Remove from favorites' : 'Add to favorites'}
                </MenuItem>
                <MenuItem onClick={() => setMoveMenu(true)}>
                  Move to folder
                </MenuItem>
                <MenuItem red onClick={() => onDelete(id)}>
                  Delete
                </MenuItem>
              </React.Fragment>
            )}
          </Menu>
        </OptionsContainer>
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
        <Tags>
          {favorite && (
            <Star onClick={() => onToggleFavorite({ id, favorite })} />
          )}
          {!tags.length
            ? 'No tags...'
            : tags.map(t => (
                <Tag key={t} onClick={() => onTagClick(t)}>
                  {t}
                </Tag>
              ))}
        </Tags>
      </Container>
    </FakeMargin>
  )
}

Gem.defaultProps = {
  folderId: null,
  onDrag: () => {},
  onDragEnd: () => {}
}

Gem.propTypes = {
  id: PropTypes.string.isRequired,
  folderId: PropTypes.string,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  displayUrl: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.string
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onTagClick: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onMoveGem: PropTypes.func.isRequired
}
