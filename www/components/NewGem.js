import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { LoadingElipsis } from './Typography'
import { Button } from './FormElements'

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

const Wrapper = styled.div`
  height: ${({ open, openHeight }) => (open ? openHeight : '0px')};
  transition: all 0.2s;
  overflow: hidden;

  padding-top: ${({ open }) => (open ? '16px' : '0')};
`
const Input = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 16px;
  outline: none;
  color: #484848;
  border: 1px solid #eaeaea;
  transition: all 0.2s;
  border-radius: 4px;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    background: #fafafa;
  }

  ${({ disabled }) =>
    disabled &&
    `border-color: #ddd; color: #ddd; background: #fafafa; cursor: not-allowed;`}
`

const Content = styled.form``

const SubmitButton = styled(Button).attrs({ type: 'sumbit' })`
  min-width: 80px;
  margin: 0;

  @media (${({ theme }) => theme.b.phoneOnly}) {
    flex: 1;
  }
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 8px;
`

const SubmitWrapper = styled(InputWrapper)`
  justify-content: flex-end;
`

const Label = styled.label`
  margin-right: 8px;
  width: 40px;
`

export default function NewGem({
  visible,
  onNewGemChange,
  newGem,
  loading,
  onSubmit
}) {
  const contentRef = useRef(null)
  const [heightState, setHeight] = useState('0px')

  useEffect(() => {
    const height = contentRef.current.offsetHeight

    setHeight(`${height}px`)
  }, [])

  return (
    <Wrapper open={visible} openHeight={heightState}>
      <Content
        ref={contentRef}
        onSubmit={e => {
          e.preventDefault()
          onSubmit(newGem)
        }}
      >
        <InputWrapper>
          <Label>Link: </Label>
          <Input
            disabled={loading}
            placeholder="example.com"
            value={newGem.url}
            onChange={({ target: { value } }) => {
              onNewGemChange({ ...newGem, url: value })
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Tags: </Label>
          <Input
            disabled={loading}
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
          <SubmitButton disabled={loading || (!isValidUrl(newGem.url) && true)}>
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
      </Content>
    </Wrapper>
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
