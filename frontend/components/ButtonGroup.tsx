import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 8px 12px;
  color: #ffffff;
  background: #440be9;
  width: 150px;
  font-size: 17px;
  font-weight: 430;
  box-shadow: 0 2px 12px -3px #1a88f8;
  border-radius: 10px;
  transition: 200ms ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 20px -6px #1a88f8;
  }
  &:active {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px -6px #1a88f8;
  }
  &:disabled,
  button[disabled] {
    border: 1px solid #999999;
    color: #ffffff;
    background: #83bffb !important;
    cursor: no-drop;
  }
`;

const ButtonGroup = ({ btnName, disable, handleClick }) => {
  return (
    <StyledButton
      disabled={disable}
      onClick={() => handleClick()}
      className="btn"
    >
      {btnName}
    </StyledButton>
  );
};

export default ButtonGroup;
