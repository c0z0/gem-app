import styled from 'styled-components'

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

  &:not(:first-child) {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &::placeholder {
    color: #ddd;
  }

  &:focus {
    border-color: #aaa;
  }

  ${({ disabled }) =>
    disabled &&
    `border-color: #ddd; color: #ddd; background: #fafafa; cursor: not-allowed;`}

  ${({ flex }) => flex && `flex: 1;`}
`

export default Input
