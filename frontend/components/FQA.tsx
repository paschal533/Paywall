import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import ButtonGroup from "./ButtonGroup";

const DropDown = ({ title, text }) => {
  const [show, setShow] = useState("");
  return (
    <div className="drop-shadow-xl sm:ml-0 ml-4 mb-4 bg-[#eae6e6] p-4 w-[40%] sm:w-full rounded-xl">
      <div className="flex justify-between w-full">
        <h1 className="font-bold">{title}</h1>
        {show === title ? (
          <RiArrowDropUpLine
            onClick={() => setShow("")}
            className="font-bold text-4xl cursor-pointer"
          />
        ) : (
          <RiArrowDropDownLine
            onClick={() => setShow(title)}
            className="font-bold text-4xl cursor-pointer"
          />
        )}
      </div>

      <p className={`${show === title ? "" : "hidden"}`}>{text}</p>
    </div>
  );
};

const FQA = () => {
  return (
    <div className="flex flex-col mt-16 justify-center items-center text-center w-full">
      <h1 className="text-7xl sm:text-5xl font-bold mb-12">
        Frequently Asked Questions
      </h1>
      <p className="text-xl w-[900px] sm:w-full">
        Here's common frequently asked questions about Paywall. Still have some
        questions? Click on button below to submit your questions.
      </p>

      <div className="w-full flex flex-wrap mt-12 mb-8 justify-center">
        <DropDown
          title="Is Paywall security guaranteed?"
          text="We monitor every transaction 24/7 to help prevent against fraud, email phishing and identity theft. Every transaction is heavily guarded behind our next-level encryption. "
        />
        <DropDown
          title="How Paywall works ?"
          text="Paywall is an online financial service that allows you to send and receive money using a secure internet account. You simply connect you wallet, create a company, add your employees, and send funds to them."
        />
        <DropDown
          title="How to activite a Paywall acount?"
          text="Creat a company and start paying your employees with one click"
        />
        <DropDown
          title="How to connect my wallet?"
          text="By clicking at the connect wallect button at the navbar"
        />
        <DropDown
          title="What do I do when I forget my pin?"
          text="No pin is required to use Paywall. Only a wallet is required"
        />
        <DropDown
          title="Do I get notified when I change my password?"
          text="If the password is changed through an application interface the user should be notified"
        />
        <DropDown
          title="Is Paywall available for windows?"
          text="With Paywal Here on your Windows devices you'll enjoy 24/7 live customer support and there are no commitments or monthly fees."
        />
        <DropDown
          title="Can I send money to others by ID?"
          text="No, you can only send money to others using their wallet address."
        />
      </div>

      <ButtonGroup
        handleClick={() => {}}
        disable={false}
        btnName="Contact Us"
      />
    </div>
  );
};

export default FQA;
