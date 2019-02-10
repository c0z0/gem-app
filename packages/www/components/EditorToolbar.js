import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'

import SubMenu from './SubMenu'
import * as Icons from './Svg'
import { LoadingElipsis } from './Typography'

const Action = styled.button`
  outline: none;
  background: white;
  z-index: 2;
  cursor: pointer;
  padding: 8px 10px;
  font-size: 21px;
  transition: all 0.2s;
  color: #484848;

  display: flex;
  align-items: center;

  &:hover {
    background: #fafafa;
    color: #484848;
  }

  ${({ active }) =>
    active &&
    ` background: red;
    `}

  color: ${({ theme }) => theme.text};
  font-weight: 500;
  border: 1px solid #eaeaea;
  border-right: none;

  &:first-child {
    border-radius: 4px 0 0 4px;
    border-left: 1px solid #eaeaea;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
    border-right: 1px solid #eaeaea;
  }

  &:only-child {
    border-radius: 4px;
  }


  ${({ divider }) => divider && `border-right: 1px solid #ddd;`}
`

const SaveStatus = styled.span`
  color: #ddd;
  align-self: center;
  margin-left: 8px;
  @media (${({ theme }) => theme.b.phoneOnly}) {
    flex: 1;
    text-align: right;
  }
`

const Controls = styled.div`
  display: flex;
`

const Carret = styled.img.attrs({ src: '/static/carret.svg' })`
  transform: rotate(90deg);
  margin-right: 8px;
  color: #484848;
`

const BackButton = styled.a`
  align-self: center;
  margin-right: 8px;
  display: flex;
  color: #aaa;
  text-decoration: none;
  align-items: center;
  transition: all 0.2s;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    flex: 1;
  }

  :hover {
    color: #484848;
  }
`

export default function EditorToolbar({
  onToggleMark,
  onToggleBlocks,
  loading,
  unsavedChanges
}) {
  // const currentStyle = editorState.getCurrentInlineStyle()

  return (
    <SubMenu
      active="/notes"
      controls={
        <React.Fragment>
          <Link href="/notes" passHref>
            <BackButton>
              <Carret />
              <span>Back</span>
            </BackButton>
          </Link>
          <Controls>
            <Action onClick={() => onToggleMark('bold')}>
              <Icons.BoldIcon />
            </Action>
            <Action divider onClick={() => onToggleMark('italic')}>
              <Icons.ItalicIcon />
            </Action>
            <Action onClick={() => onToggleBlocks('h2')}>
              <Icons.HeaderBigIcon />
            </Action>
            <Action onClick={() => onToggleBlocks('h3')}>
              <Icons.HeaderSmallIcon />
            </Action>
          </Controls>
          <SaveStatus>
            {!loading ? (
              unsavedChanges ? (
                'Not saved'
              ) : (
                'Saved'
              )
            ) : (
              <React.Fragment>
                Saving
                <LoadingElipsis />
              </React.Fragment>
            )}
          </SaveStatus>
        </React.Fragment>
      }
    />
  )
}

EditorToolbar.propTypes = {
  onToggleMark: PropTypes.func.isRequired,
  onToggleBlocks: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  unsavedChanges: PropTypes.bool.isRequired
}
