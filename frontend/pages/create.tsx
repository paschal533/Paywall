import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import ButtonGroup from "@components/ButtonGroup";
import { ConnectKitButton } from "connectkit";
import styled from "styled-components";
import { AuthContext } from "@/context/AuthContext";
import { CompanyContext } from "@/context/CompanyContext";
import Success from "../assets/success.webp";
import Confetti from "react-confetti";
import { Spinner } from "@chakra-ui/react";

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 8px 12px;
  color: #ffffff;
  background: #440be9;
  width: 130px;
  font-size: 17px;
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

const Create = () => {
  const [name, setName] = useState("");
  const [isLoading, SetisLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const { currentAccount } = useContext(AuthContext);
  const { createCompany } = useContext(CompanyContext);

  const handleCreate = async () => {
    if (!name) return;
    SetisLoading(true);

    try {
      await createCompany(name);
      setCreated(true);
      SetisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (created) {
    return (
      <div className="items-center mt-12 justify-center flex flex-col w-full pl-10 pr-10 sm:pl-5 sm:pr-5">
        <Confetti className="w-full h-screen" recycle={true} />
        <h1 className="text-3xl font-bold">
          Congrats, your company is created!
        </h1>
        <Image alt="success image" src={Success} height={500} width={400} />
        <p className="mb-4 font-semibold text-xl">
          {name} has been successfully create on Paywall. You can edit/add the
          company employees anytime.
        </p>
        <div className="">
          <Link href="/dashboard">
            <ButtonGroup
              handleClick={() => {}}
              btnName="View company"
              disable={false}
            />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-white h-[100vh] text-black justify-center sm:px-4 p-12">
      <Head>
        <title>Create a Company</title>
      </Head>
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins text-nft-black-1 font-semibold text-2xl">
          Create new Company
        </h1>
        <div className="mt-10 w-full">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Company Name
          </p>

          <input
            className=" bg-[#f8f6f6] border border-nft-gray-2 rounded-lg w-full outline-none font-poppins text-nft-gray-2 text-base mt-4 px-4 py-3"
            placeholder="Company name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-4 float-right">
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
            <ButtonGroup
              handleClick={handleCreate}
              btnName={isLoading ? <Spinner color="white" /> : "create"}
              disable={!name.length}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
