import React, { useContext } from "react";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import styled from "styled-components";
import { AuthContext } from "@/context/AuthContext";

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 8px 12px;
  color: #ffffff;
  background: #440be9;
  width: 100px;
  font-size: 15px;
  font-weight: 400;
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

const NavButtonGroup = ({ setIsOpen }) => {
  const { currentAccount } = useContext(AuthContext);

  return (
    <div className="flex justify-center align-center">
      <Link href="/create">
        <div className="mx-4 pl-4 pr-4 pt-1 pb-1 btn-primary text-[#440BE9] border-2 border-[#440BE9] text-md font-bold rounded-xl">
          Create
        </div>
      </Link>
      <div onClick={() => setIsOpen(false)}>
        {!currentAccount ? (
          <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress, ensName }) => {
              return (
                <StyledButton onClick={show}>
                  {isConnected ? ensName ?? truncatedAddress : "Connect"}
                </StyledButton>
              );
            }}
          </ConnectKitButton.Custom>
        ) : (
          <ConnectKitButton />
        )}
      </div>
    </div>
  );
};

export default NavButtonGroup;
