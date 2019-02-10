import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import NoSSR from 'react-no-ssr'

import styled from 'styled-components'

import Container from './Container'
import { Title, LoadingElipsis } from './Typography'
import EditorToolbar from './EditorToolbar'

function toggleBlocks(editor, type) {
  const isType = editor.value.blocks.some(block => block.type === type)

  editor.setBlocks(isType ? 'paragraph' : type)
}

const EditorContainer = styled(Container)`
  font-family: serif;
  font-size: 21px;
  position: relative;
`

const TitleInput = styled.input`
  border: none;
  outline: none;
  background: none;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  width: 100%;
  color: #484848;
  font-family: serif;

  &::placeholder {
    opacity: 0.2;
  }
`

const Marks = {
  bold: styled.strong``,
  italic: styled.i``
}

const Code = styled.code`
  font-size: 16px;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace, serif;
`

const Blocks = {
  h1: styled.h1``,
  h2: styled.h2``,
  h3: styled.h3``,
  code(props) {
    /* eslint-disable */
    return (
      <pre {...props.attributes}>
        <Code>{props.children}</Code>
      </pre>
    )
    /* eslint-enable */
  }
}

export default function RichEditor({
  content,
  title,
  onSave,
  onChange,
  unsavedChanges,
  id,
  loading
}) {
  const [editorState, setEditorState] = useState(
    Value.fromJSON(JSON.parse(content))
  )

  const [titleState, setTitleState] = useState(title)

  const editorRef = useRef(null)
  const titleInputRef = useRef(null)

  useEffect(() => titleInputRef.current.focus(), [])

  useEffect(() => {
    function saveListener(e) {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()

        onSave({
          content: JSON.stringify(editorState.toJSON()),
          title: titleState,
          id
        })
      }
    }

    document.addEventListener('keydown', saveListener)

    return () => document.removeEventListener('keydown', saveListener)
  }, [titleState, editorState.document])

  const onKeyDown = (event, editor, next) => {
    if (!event.ctrlKey) return next()

    switch (event.key) {
      case 'b': {
        event.preventDefault()
        return editor.toggleMark('bold')
      }

      case 'i': {
        event.preventDefault()
        return editor.toggleMark('italic')
      }

      case '1': {
        event.preventDefault()
        return toggleBlocks(editor, 'h1')
      }
      case '2': {
        event.preventDefault()
        return toggleBlocks(editor, 'h2')
      }

      case '3': {
        event.preventDefault()
        return toggleBlocks(editor, 'h3')
      }

      case 'p': {
        event.preventDefault()
        return editor.setBlocks('paragraph')
      }

      case '`': {
        event.preventDefault()
        return toggleBlocks(editor, 'code')
      }

      default: {
        return next()
      }
    }
  }

  const renderMark = (props, _, next) => {
    const M = Marks[props.mark.type] // eslint-disable-line

    if (!M) return next()

    return <M {...props} />
  }

  const renderNode = (props, _, next) => {
    const B = Blocks[props.node.type] // eslint-disable-line

    if (!B) return next()

    return <B {...props} />
  }

  return (
    <React.Fragment>
      <EditorToolbar
        unsavedChanges={unsavedChanges}
        onToggleMark={mark => editorRef.current.toggleMark(mark)}
        onToggleBlocks={type => toggleBlocks(editorRef.current, type)}
        loading={loading}
      />
      <EditorContainer>
        <TitleInput
          value={titleState}
          onChange={({ target: { value } }) => {
            onChange({
              content: JSON.stringify(editorState.toJSON()),
              title: value,
              id
            })
            setTitleState(value)
          }}
          placeholder="Title..."
          ref={titleInputRef}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              editorRef.current.focus()
            }
          }}
        />
        <NoSSR
          onSSR={
            <Title style={{ textAlign: 'center', color: '#484848' }}>
              <LoadingElipsis />
            </Title>
          }
        >
          <Editor
            placeholder="Start writing your thoughts..."
            ref={editorRef}
            renderNode={renderNode}
            renderMark={renderMark}
            value={editorState}
            onChange={({ value }) => {
              if (editorState.document !== value.document)
                onChange({
                  content: JSON.stringify(editorState.toJSON()),
                  title: titleState,
                  id
                })
              setEditorState(value)
            }}
            onKeyDown={onKeyDown}
          />
        </NoSSR>
      </EditorContainer>
    </React.Fragment>
  )
}

RichEditor.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  unsavedChanges: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
}
