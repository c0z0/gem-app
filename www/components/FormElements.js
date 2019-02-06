import styled from 'styled-components'

export const Input = styled.input`
  width: 275px;
  max-width: 100%;
  padding: 8px;
  font-size: 16px;
  outline: none;
  color: #484848;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: all 0.2s;
  margin: 1rem 0;

  &::placeholder {
    color: #ddd;
  }

  &:focus {
    border-color: #aaa;
  }

  ${({disabled}) =>
    disabled &&
    `border-color: #ddd; color: #ddd; background: #fafafa; cursor: not-allowed;`}
`

export const Button = styled.button`
  outline: none;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 16px;
  margin: 4px;
  color: white;
  cursor: pointer;
  background: ${({theme}) => theme.main};
  border: 1px solid transparent;

  ${({disabled}) =>
    disabled &&
    `color: #ddd; border-color: #ddd; background: #fafafa; cursor: not-allowed;`}
`
