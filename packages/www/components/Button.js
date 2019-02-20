import styled from 'styled-components'

import { LoadingElipsis } from './Typography'

const Button = styled.button.attrs({ role: 'button' })`
  font-size: 16px;
  color: white;
  background: ${({ theme }) => theme.main};

  padding: 0 2rem;
  line-height: 2.5rem;
  margin: 0;
  border-radius: 7px;
  height: 2.5rem;
  box-shadow: 0px 4px 14px rgba(117, 72, 155, 0.39);
  transition: all 0.2s;
  outline: none;
  border: none;
  cursor: pointer;

  text-transform: capitalize;

  &:hover {
    opacity: 0.9;
    box-shadow: 0px 6px 20px rgba(117, 72, 155, 0.39);
  }

  ${({ secondary, theme }) =>
    secondary &&
    `
    color: ${theme.main};
    background: white;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);

    &:hover {
      box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.12);
    }

  `}

${({ small }) =>
  small &&
  `
    height: 2rem;
    line-height: 2rem;

  `}

${({ flat }) =>
  flat &&
  `
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  `}

  ${({ loading, disabled }) =>
    (loading || disabled) &&
    `
    cursor: not-allowed;
    color: #CCCCCC;
    box-shadow: none !important;
    opacity: 1 !important;
    background: #EFEFEF;
  `}

`

Button.Elipsis = LoadingElipsis

export default Button
