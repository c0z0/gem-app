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

export default Input
