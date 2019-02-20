import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { LoadingElipsis } from './Typography'
import Button from './Button'
import Input from './Input'
import Expando from './Expando'

export function isValidUrl(string) {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    try {
      url = new URL(`http://${string}`)
    } catch (__) {
      return null
    }
  }
  return url
}

const SubmitButton = styled(Button).attrs({ type: 'sumbit' })`
  min-width: 80px;
  margin: 0;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    width: 100%;
  }
`

const InputWrapper = styled.div`
  display: flex;
  padding: 4px 0;

  &:last-child {
    padding: 8px 0;
  }

  &:first-child {
    padding-top: 8px;
  }
`

const SubmitWrapper = styled(InputWrapper)`
  justify-content: space-between;
  flex-direction: row-reverse;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    flex-direction: column;
  }
`

export default function NewGem({
  visible,
  onNewGemChange,
  newGem,
  loading,
  onSubmit
}) {
  const linkInputRef = useRef(null)

  useEffect(() => {
    if (visible) {
      linkInputRef.current.focus()
    } else {
      linkInputRef.current.blur()
    }
  }, [visible])

  return (
    <Expando open={visible}>
      <form
        onSubmit={e => {
          e.preventDefault()
          onSubmit(newGem)
        }}
      >
        <InputWrapper>
          <Input.WithLabel
            inputRef={linkInputRef}
            label="Link: "
            flex
            disabled={loading || !visible}
            placeholder="example.com"
            value={newGem.url}
            onChange={({ target: { value } }) => {
              onNewGemChange({ ...newGem, url: value })
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <Input.WithLabel
            label="Tags: "
            flex
            disabled={loading || !visible}
            placeholder="diy, development, gym"
            value={newGem.tags.join(',')}
            onChange={({ target: { value } }) => {
              onNewGemChange({
                ...newGem,
                tags: value.split(',')
              })
            }}
          />
        </InputWrapper>
        <SubmitWrapper>
          <SubmitButton
            disabled={loading || (!isValidUrl(newGem.url) && true)}
            flat
          >
            {loading ? (
              <React.Fragment>
                Loading
                <LoadingElipsis />
              </React.Fragment>
            ) : (
              'Add'
            )}
          </SubmitButton>
        </SubmitWrapper>
      </form>
    </Expando>
  )
}

NewGem.propTypes = {
  visible: PropTypes.bool.isRequired,
  newGem: PropTypes.shape({
    url: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onNewGemChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}
