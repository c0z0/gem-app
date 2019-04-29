import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Input = styled.input`
  width: 320px;
  max-width: 100%;
  padding: 10px;
  font-size: 16px;
  outline: none;
  color: #484848;
  border: 1px solid #ddd;
  border-radius: 7px;
  transition: all 0.2s;
  margin: 1rem 0;

  &::placeholder {
    color: #ddd;
  }

  &:focus {
    background: #fafafa;
  }

  ${({ disabled }) =>
    disabled &&
    `border-color: #ddd; color: #ddd; background: #fafafa; cursor: not-allowed;`}

  ${({ flex }) => flex && `flex: 1;`}
`

const InputWrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 7px;
  transition: all 0.2s;
  color: #484848;
  flex: 1;
  width: 320px;
  max-width: 100%;
  display: flex;
  align-items: center;
  padding-right: 10px;
  padding-left: 16px;

  &:focus-within {
    background: #fafafa;
  }

  ${({ disabled }) =>
    disabled &&
    `border-color: #ddd; color: #ddd; background: #fafafa; cursor: not-allowed;`}

  ${({ flex }) => flex && `flex: 1;`}
`

const Label = styled.label`
  min-width: 42px;
  text-align: center;
`

const InputWithLabel = styled.input`
  padding: 10px 0;
  flex: 1;
  padding-left: 10px;
  border: none;
  background: transparent;
  border-left: 1px solid #ddd;
  font-size: 16px;
  outline: none;
  color: #484848;
  margin-left: 16px;

  &::placeholder {
    color: #ddd;
  }
`

Input.WithLabel = props => (
  <InputWrapper>
    <Label>
      {props.label /* eslint-disable-line react/destructuring-assignment */}
    </Label>
    <InputWithLabel
      {...props}
      ref={
        props.inputRef /* eslint-disable-line react/destructuring-assignment */
      }
    />
  </InputWrapper>
)

Input.WithLabel.defaultProps = {
  inputRef: null
}

Input.WithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.any })
}

const SugestionInputWrapper = styled.div`
  position: relative;
`

const SugestionWrapper = styled.div`
  position: absolute;
  top: 11px;
  left: 11px;
`

const PlaceHolder = styled.span`
  z-index: -1;
  color: transparent;
  margin-right: 1px;
`

const Sugestion = styled.span`
  color: #ccc;
`

function getTypedDomain(string) {
  if (!string.includes('@')) return ''
  return string.slice(string.indexOf('@') + 1)
}

const domains = [
  'gmail.com',
  'yahoo.com',
  'aol.com',
  'hotmail.com',
  'inbox.com',
  'outlook.com',
  'live.com',
  'mail.com',
  'cserdean.com'
]

function getSuggestion(string) {
  const typedDomain = getTypedDomain(string)

  if (!typedDomain) return ''

  const foundDomain = domains.find(
    d => d.slice(0, typedDomain.length) === typedDomain
  )

  if (!foundDomain) return ''

  return foundDomain.slice(typedDomain.length)
}

export function EmailInput({ innerRef, value, onChange, ...props }) {
  const suggestion = getSuggestion(value)

  return (
    <SugestionInputWrapper>
      {suggestion && (
        <SugestionWrapper>
          <PlaceHolder>{value}</PlaceHolder>
          <Sugestion
            onClick={() => onChange({ target: { value: value + suggestion } })}
          >
            {suggestion}
          </Sugestion>
        </SugestionWrapper>
      )}
      <Input
        {...props}
        onChange={onChange}
        value={value}
        ref={innerRef}
        onKeyDown={e => {
          if (suggestion && (e.key === 'Tab' || e.key === 'ArrowRight'))
            onChange({ target: { value: value + suggestion } })
        }}
      />
    </SugestionInputWrapper>
  )
}

EmailInput.defaultProps = {
  innerRef: null
}

EmailInput.propTypes = {
  innerRef: PropTypes.shape({ current: PropTypes.any }),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Input
