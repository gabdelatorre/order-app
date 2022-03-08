import { FC } from 'react';
import styled from 'styled-components';
import { ButtonProps, DropdownButton } from 'react-bootstrap';

const StyledButton = styled(DropdownButton)`
  background-color: transparent;
  border: none;
  outline: none;
  box-shadow: none !important;

  &:active,
  &:focus {
    background-color: transparent;
    outline: none;
  }

  &:hover {
    background-color: #4a4a4a;
    i {
      color: #ffffff;
    }
  }

  i {
    color: #4a4a4a;
  }
`;

export const IconButton: FC & ButtonProps = ({ children, ...others }) => {
  return <StyledButton {...others}>{children}</StyledButton>;
};
